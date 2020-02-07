<template>
    <div v-if="isLoggedIn">
        <div class="add-transaction">
            <div>
                <h1 style="font-size:200%; font-weight:bold">New Transaction:</h1>
                <div class="new-transaction">
                    <form v-on:submit.prevent="addToCart()">
                    <h1 style="font-size:120%; font-weight:bold"><u>Add New Transaction</u></h1>
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
        </div>

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

</template>
    

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iTransactions } from "../models/transactions.interface";
import { log } from "util";


@Component({})
export default class AddTransaction extends Vue {
    error: boolean = false;
    errorMsg: string = "";
    cartMsg: string = "No Items In Cart";
    description: string = "";
    amount: number = 0;
    category: string = "";
    date: string = "";
    inventoryId: string = "NA";
    quantity: number = 0;
    services = [""];
    transactions: iTransactions[] = [];

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
            this.transactions.push(this.newTrans());

            this.category = "";
            this.amount = 0;
            this.quantity = 0;
            this.description = "";
        }

  }


  newTrans(): iTransactions {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return {
        description: this.description,
        amount: Number(this.amount),
        category: this.category,
        date: mm + '/' + dd + '/' + yyyy,
        inventoryId: this.inventoryId,
        quantity: Number(this.quantity)
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
        padding-top: 112px;
        padding-left: 5px;
        padding-right: 250px;
        float: right;
}
</style>

