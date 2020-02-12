<template>
    <div v-if="isLoggedIn">
        <div class="add-transaction">
            <div>
                <h1 style="font-size:200%; font-weight:bold">New Transaction:</h1>
                <div class="new-transaction">
                    <form v-on:submit.prevent="addToCart()">
                    <h1 style="font-size:120%; font-weight:bold"><u>Create New Transaction</u></h1>
                    <br>
                    <p v-if="error" style="color:red">{{errorMsg}}</p>
                    <p>Type:</p> 
                    <select required v-model="category">
                        <option disabled value="">Select Type Of Transaction</option>
                        <option>Expense</option>
                        <option>Revenue</option>
                    </select>
                    <br>
                    <p>Amount:</p>
                    <textarea rows="2" style="width:220px" v-model="amount" required></textarea>
                    <br>
                    <p>Quantity:</p> 
                    <textarea rows="2" style="width:220px" v-model="quantity" required></textarea>
                    <br>
                    <p>Add A Description:</p>
                    <p>(Or Select Services)</p>
                    <textarea rows="10" style="width:300px" v-model="description" required></textarea>
                    <br>
                    <select  v-model="description">
                        <option disabled value="">Select Service</option>
                        <option
                            v-for="selectedService in services"
                            v-bind:key="selectedService"
                            :value="selectedService"
                            >{{selectedService}}</option>
                        </select>
                    <button style="width:20%; margin-left: 213px; margin-top: 20px">Add To Cart</button>
                    </form>
                </div>
            </div>
            
            <br><br>
            <div class="add-trans-inventory">
                <h1 style="font-size:120%; font-weight:bold"><u>Select Item From Inventory</u>
                    <p v-if="quantityError" style="color:red">{{quantityErrorMsg}}</p>
                    <p v-if="addInvSuccess" style="color:green">{{addInvSuccessMsg}}</p>
                </h1>
                <br>
            
            <div class="filter-by">
            <h1><u>Select One:</u></h1><br>
            <p>Brand:</p> 
              <select v-model="brandChoosen" >
                <option
                  v-for="selectedBrand in allBrand"
                  v-bind:key="selectedBrand"
                  :value="selectedBrand"
                >{{selectedBrand}}</option>
              </select>
            <p>Size:</p> 
              <select v-model="sizeChoosen" >
                <option
                  v-for="selectedSize in allSize"
                  v-bind:key="selectedSize"
                  :value="selectedSize"
                >{{selectedSize}}</option>
              </select>
             <p>Category:</p> 
              <select v-model="categoryChoosen" >
                <option
                  v-for="selectedCategory in allCategories"
                  v-bind:key="selectedCategory"
                  :value="selectedCategory"
                >{{selectedCategory}}</option>
              </select>
              <div>
                <button type="button" style="margin-left: 100px;border-radius: 12px;" v-on:click="showItems()">Select</button>
              </div>
            </div>

            <div class="inventory">
                <article v-for="(a, index) in inventory" v-bind:key="index">
                    <div class="item-box">
                        <img :src="a.image"  width="200" height="200">
                        <div class="item-info">
                            <p>Size:  {{a.size}}</p>
                            <p>Brand:  {{a.brand}}</p>
                            <p>Price:  ${{a.price}}</p>
                            <p>Quantity: {{a.quantity}}</p>
                            <p>{{a.category}}</p>
                        </div>
                        
                        <form v-on:submit.prevent="addToCartFromInven(a.size, a.brand, a.price, a.quantity, a.category, index,a.key)">

                            <p>Number Of Items To Add: <textarea rows="1" style="width:50px"  v-model="itemsToAdd" required></textarea></p>
                            <button style="margin-left: 20px;border-radius: 12px;">Add To Cart</button>
                        </form>
                    </div>
                </article>
                <div v-if="inventory.length==0">
                  <h1 style="padding-left: 100px; font-size: 24px">Select An Item</h1>
                </div>
            </div>

            </div>
        </div>
        <div class="cart-box">
            <div class="cart-list">
                <br><br>
                <h1 style="font-size:120%; font-weight:bold"><u>Items In Cart:</u></h1>
                <p v-if="transactions.length==0" style="color:green"><br>{{cartMsg}}</p>
                <article v-for="(a, index) in transactions" v-bind:key="index">
                    <p> {{a.category}} </p>
                    <p> {{a.description}} </p>
                    <p> Quantity: {{a.quantity}} </p>
                    <p> Amount: {{a.amount}} </p>
                    <p>----------------------------------------</p>
                </article>
                <p v-if="transactions.length>0">Total Expenses = {{getExpenses()}}</p>
                <p v-if="transactions.length>0">Total Revenue = {{getRevenue()}}</p>
                <button v-if="transactions.length>0" @click="completeOrder" style="width:40%; margin-left: 213px; margin-top: 20px">Complete Order</button>
                <br><br><br><br><br>
            </div>
        </div>

 </div>

        

</template>
    

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iTransactions } from "../models/transactions.interface";
import { iInventory } from "../models/inventory.interface";
import { log } from "util";


@Component({})
export default class AddTransaction extends Vue {
    error: boolean = false;
    errorMsg: string = "";
    cartMsg: string = "No Items In Cart";
    quantityError: boolean = false;
    quantityErrorMsg: string = "Invalid Quantity";
    addInvSuccess: boolean = false;
    addInvSuccessMsg: string = "Item(s) Added To Cart";
    description: string = "";
    amount: number = 0;
    itemsToAdd: number = 0;
    category: string = "";
    date: string = "";
    inventoryId: string = "NA";
    quantity: number = 0;
    services = [""];
    transactions: iTransactions[] = [];
    inventory: iInventory[] = [];
    allInventory: iInventory[] = [];
    brandChoosen: string = "ALL";
    categoryChoosen: string = "ALL";
    sizeChoosen: string = "ALL";
    allBrand = ["ALL"];
    allCategories = ["ALL", "NEW", "USED", "WHEEL"];
    allSize = ["ALL"];

    created() {
        this.getAllServices().then(data => {
            for (let key in data["0"]){
                //this.services.push(data[0][key]);
                if(key != "id"){
                    this.services.push(data[0][key]["seTitle"]);
                }
            }
            this.services.shift();
        });

        this.getInventory().then(data => {

            for (let key in data){
                this.inventory.push(data[String(key)]);
            }
            console.log(this.inventory);
            this.allInventory = this.inventory;
            this.inventory = [];
        });
    }

    showItems(){
        this.addInvSuccess = false;
        this.quantityError = false;
        this.inventory = [];
        var i = 0;
        for(i = 0; i < this.allInventory.length; i++){
            if(this.brandChoosen == "ALL" || this.allInventory[i].brand.toUpperCase() == this.brandChoosen){
                if(this.sizeChoosen == "ALL" || this.allInventory[i].size.slice(-2) == this.sizeChoosen){
                    if(this.categoryChoosen == "ALL" || this.allInventory[i].category.toUpperCase() == this.categoryChoosen){
                        this.inventory.push(this.allInventory[i]);
                    }
                }       
            }      
        }
    }

    getAllServices() {
        this.error = false;

        var servicesArray = [""];
        
        return axios.get('https://texanotireshop.firebaseio.com/services.json')
        .then(function(data)  {
            return data.data;}).then(function(data) {
            
            for (let key in data){
                servicesArray.push(data[key]);
            }
            //Remove "" element in array
            servicesArray.shift();

            return servicesArray;
        })
    }

    getInventory() {
        this.error = false;

        var inventoryArray = [""];
        var self = this;
        

        return axios.get('https://texanotireshop.firebaseio.com/inventory.json')
        .then(function(data)  {
            return data.data;}).then(function(data) {
            var i: number = 0;
            for (let key in data){
            data[key].key = key;
            data[key].initialIndex = i;
            i = i + 1;
            inventoryArray.push(data[key]);
            self.allBrand.push(data[key].brand.toUpperCase());
            self.allSize.push(data[key].size.slice(-2));
            //console.log(key);
            }
            //Remove "" element in array
            inventoryArray.shift();

            self.allSize = self.uniqueItem(self.allSize);
            self.allBrand = self.uniqueItem(self.allBrand);
            console.log(self.allSize);
        return inventoryArray;
        
        })
    }

    uniqueItem(array: any){
      var uniqueArray = [""];
      var i = 0;
      for(i = 0; i < array.length; i++){
        if(!uniqueArray.includes(array[i])){
          uniqueArray.push(array[i]);
        }
      }
      uniqueArray.shift();
      return uniqueArray;
    }

    completeOrder(){
        console.log("Order Completed");
        var self = this;
        let i = 0;
        for(i=0; i<this.transactions.length;i++){
            axios.post('https://texanotireshop.firebaseio.com/transactions.json', {
                description: self.transactions[i].description,
                amount: Number(self.transactions[i].amount),
                category: self.transactions[i].category,
                date: self.transactions[i].date,
                inventoryId: self.transactions[i].inventoryId,
                quantity: Number(self.transactions[i].quantity)
            })
            .then(function (response) {
            console.log(response);
                self.transactions = [];
                self.cartMsg = "Items Added To Transactions Successfully";
                //TODO: UPDATE ITEMS QUANTITY FROM INVENTORY 
            })
        }
    }

    getTotalInCart(){
        return (this.getRevenue()-this.getExpenses());
    }

    getRevenue(){
        let total = 0;
        let i = 0;
        for(i = 0; i<this.transactions.length; i++){
            if(this.transactions[i].category == "Revenue"){
                total += Number(this.transactions[i].amount)
            }
        }
        return total;
    }

    getExpenses(){
        let total = 0;
        let i = 0;
        for(i = 0; i<this.transactions.length; i++){
            if(this.transactions[i].category == "Expense"){
                total += Number(this.transactions[i].amount)
            }
        }
        return total;
    }


    addToCart(){
        if(isNaN(Number(this.amount)) || isNaN(Number(this.quantity))){
            this.error = true;
            this.errorMsg = "Error: Not A Number";
        }
        else if(Number(this.amount) <= 0 || Number(this.quantity) <= 0){
            this.error = true;
            this.errorMsg = "Error: Number Has To Be Greater Than 0";
        }
        else {
            this.error = false;
            console.log("Added to cart");
            this.transactions.push(this.newTrans(this.description, this.amount, this. category, this.inventoryId, this.quantity));

            this.category = "";
            this.amount = 0;
            this.quantity = 0;
            this.description = "";
        }
  }

  addToCartFromInven(size: string , brand: string, price: number, quantity: number, 
  category:string, index: number, key: string){
      if(this.itemsToAdd <= 0 || this.itemsToAdd > quantity){
          this.quantityError = true;
          this.addInvSuccess = false;
      }
      else{
          this.quantityError = false;
          this.addInvSuccess = true;
          this.transactions.push(this.newTrans(category+" "+brand+" "+size, price*this.itemsToAdd, "Expense", key, this.itemsToAdd));
          this.allInventory[index].quantity -= this.itemsToAdd;
      }
      // itemsToAdd
  }


  newTrans(description: string, amount: number, category: string, inventoryId: string, 
    quantity: number): iTransactions {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return {
        description: description,
        amount: Number(amount),
        category: category,
        date: mm + '/' + dd + '/' + yyyy,
        inventoryId: inventoryId,
        quantity: Number(quantity)
    }
}

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
  }
}
</script>

<style scoped>
    .add-transaction {
        padding-top: 44px;
        padding-left: 70px;
        float: left;
    }
    .new-transaction {
        padding-top: 20px;
        padding-left: 50px;
    }

    .cart-list{
        padding-top: 5px;
        padding-left: 25px;
        padding-right: 100px;
        float: right;
        width: 500px;
        height: 430px;
        overflow: auto;

    }

    .add-trans-inventory {
        padding-top: 44px;
        padding-left: 50px;
        float: left;
    }

    .filter-by {
      float: left;
      border: 1px solid black;
      padding: 20px;
    }
    .item-box {
        width: 300px;
        border: 1px solid rgb(187, 185, 185);
        padding: 10px;
        float: left;
        margin: 15px;
        background-color: rgb(184, 188, 190);
        text-align: center;
    }
    .item-info {
        border: 1px solid rgb(156, 153, 153);
        padding: 10px;
        text-align: left;
    }
    .inventory {
        float: right;
    }
    .cart-box {
        position: absolute;
        top: 220px;
        right: 50px;
        width: 500px;
        height: 450px;
        border: 2px solid black;
    }

</style>

