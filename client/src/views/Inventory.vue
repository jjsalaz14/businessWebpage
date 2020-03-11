<template>
    <div class="inventory"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Items Available:</h1><br>
            
            <div class="filter-by">
            <h1><u>Filter By:</u></h1><br>
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
                <button type="button" style="margin-left: 100px;border-radius: 12px;" v-on:click="filterItems()">Filter</button>
              </div>
            </div>

            <!-- Customer view -->
            <div v-if="!isLoggedIn" class="margin">
                <article v-for="(a, index) in inventory" v-bind:key="index">
                    <div class="item-box">
                        <img :src="a.image"  width="200" height="200">
                        <div class="item-info">
                            <p>Size:  {{a.size}}</p>
                            <p>Brand:  {{a.brand}}</p>
                            <p>Price:  ${{a.price}}</p>
                            <p v-if="Number(a.quantity)<10">Low In Stock</p>
                            <p v-if="Number(a.quantity)>=10">In Stock</p>
                            <p>{{a.category}}</p>
                        </div>
                    </div>
                </article>
                <div v-if="inventory.length==0">
                  <h1 style="padding-left: 100px; font-size: 24px">Item Not In Stock</h1>
                  <h1 style="padding-left: 100px; font-size: 24px">Give Us A Call To Order It</h1>
                </div>
            </div>

            <!-- Owner View -->
            <div v-if="isLoggedIn" class="margin">
                <article class="owner-inv-list" v-for="(a, index) in inventory" v-bind:key="index">
                    <form>
                    <div class="item-box">
                        <img :src="a.image" width="200" height="200">
                        <div class="item-info">
                            <p>Size:  <textarea class="inv-size" rows="1" style="width:200px"  v-model="a.size" required></textarea></p>
                            <p>Brand:  <textarea class="inv-brand" rows="1" style="width:186px"  v-model="a.brand" required></textarea></p>
                            <p>Price:  <textarea class="service-desc" rows="1" style="width:193px"  v-model="a.price" required></textarea></p>
                            <p>Quantity:  <textarea class="service-desc" rows="1" style="width:166px"  v-model="a.quantity" required></textarea></p>
                            <p>{{a.category}}</p>

                            <button type="button" style="margin-left: 100px; background-color: #48e319;border-radius: 12px;" v-on:click="updateInvenItem(a.image, a.size, a.brand, a.price, a.quantity, a.category, index)">Update</button>
                            <button type="button" style="margin-left: 30px; background-color: #ff3e3e; border-radius: 12px;" v-on:click="deleteInvenItem(index)">Delete</button>
                        </div>
                    </div>
                    </form>
                </article>
                <div v-if="inventory.length==0">
                  <h1 style="padding-left: 100px; font-size: 24px">Item Not In Stock</h1>
                  <h1 style="padding-left: 100px; font-size: 24px">Give Us A Call To Order It</h1>
                </div>
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iInventory } from "../models/inventory.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Services extends Vue {
  error: string | boolean = false;
  inventory: iInventory[] = [];
  allInventory: iInventory[] = [];
  keyId: string = "";
  brandChoosen: string = "ALL";
  categoryChoosen: string = "ALL";
  sizeChoosen: string = "ALL";
  allBrand = ["ALL"];
  allCategories = ["ALL", "NEW", "USED", "WHEEL"];
  allSize = ["ALL"];

  created() {
    this.getInventory().then(data => {

      for (let key in data){
        this.inventory.push(data[String(key)]);
      }
      console.log(this.inventory);
      this.allInventory = this.inventory;
    });
  }

  filterItems(){
    console.log(this.sizeChoosen);
    console.log(this.categoryChoosen);
    console.log(this.brandChoosen);
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
    console.log()
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


    deleteInvenItem(index: number){

      console.log("deleting item");
      var self = this;
      var inventoryKey = this.inventory[index]["key"];

      const axios = require('axios');
      async function makeRequest() {
        let res = await axios.delete('https://texanotireshop.firebaseio.com/inventory/' + inventoryKey + '.json');
      //console.log(res.status);
        self.refreshInventory();
      }
      makeRequest();
  
    }

    updateInvenItem(image: string, size: string, brand: string, price: number, quantity: number, category: string, index: number ) {
      // var keyId = this.services[id-1]["key"];
      var inventoryId = this.inventory[index]["key"];


      axios.put('https://texanotireshop.firebaseio.com/inventory/' + inventoryId + '.json', {
        size: size,
        brand: brand, 
        price: Number(price),
        quantity: Number(quantity),
        category: category,
        image: image
      })
      .then(function (response) {
        console.log("Updated Item Successfully");
      })
      .catch(function(error){
        console.log("Error Updating Item");
        console.log(error);
      });
    }

    refreshInventory() {
      this.inventory = [];
      this.getInventory().then(data => {
        for (let key in data){
          this.inventory.push(data[String(key)]);
        }
        console.log(this.inventory); 
        this.allInventory = this.inventory; 
        this.filterItems();
    });
  }

    get isLoggedIn(): boolean {
        return !!this.$store.state.userId;
    }


}

</script>


<style scoped>
    .item-box {
        width: 300px;
        border: 1px solid rgb(187, 185, 185);
        padding: 10px;
        float: left;
        margin: 15px;
        background-color: rgb(184, 188, 190);
        text-align: center;
    }
    .margin {
        padding-left: 200px;
        padding-top: 5px;
    }
    .description {
        padding-top: 45px;
        padding-left: 70px;
    }
    .item-info {
        border: 1px solid rgb(156, 153, 153);
        padding: 10px;
        text-align: left;
    }
    .filter-by {
      float: left;
      border: 1px solid black;
      padding: 20px;
    }
    img {
      width:200px;
      height:200px;
      object-fit:cover;
    }

</style>