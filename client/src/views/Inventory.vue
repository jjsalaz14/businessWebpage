<template>
    <div class="inventory"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Items Available:</h1><br>

            <!-- Customer view -->
            <div v-if="!isLoggedIn" class="margin">
                <article v-for="(a, index) in inventory" v-bind:key="index">
                    <div class="item-box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/inventoryTire.png?alt=media&token=7f642799-37ce-4a55-a2af-e88bb25f218e"  width="200" height="200">
                        <div class="item-info">
                            <p>Size:  {{a.size}}</p>
                            <p>Brand:  {{a.brand}}</p>
                            <p>Price:  ${{a.price}}</p>
                            <p>Quantity:  {{a.quantity}}</p>
                            <p>{{a.category}}</p>

                        </div>
                    </div>
                </article>
            </div>

            <!-- Owner View -->
            <div v-if="isLoggedIn" class="margin">
                <article v-for="(a, index) in inventory" v-bind:key="index">
                    <form>
                    <div class="item-box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/inventoryTire.png?alt=media&token=7f642799-37ce-4a55-a2af-e88bb25f218e"  width="200" height="200">
                        <div class="item-info">
                            <p>Size:  <textarea class="service-desc" rows="1" style="width:200px"  v-model="a.size" required></textarea></p>
                            <p>Brand:  <textarea class="service-desc" rows="1" style="width:186px"  v-model="a.brand" required></textarea></p>
                            <p>Price:  <textarea class="service-desc" rows="1" style="width:193px"  v-model="a.price" required></textarea></p>
                            <p>Quantity:  <textarea class="service-desc" rows="1" style="width:166px"  v-model="a.quantity" required></textarea></p>
                            <p>{{a.category}}</p>

                            <button type="button" style="margin-left: 100px; background-color: #48e319;border-radius: 12px;" v-on:click="updateInvenItem(index)">Update</button>
                            <button type="button" style="margin-left: 30px; background-color: #ff3e3e; border-radius: 12px;" v-on:click="deleteInvenItem(index)">Delete</button>
                        </div>
                    </div>
                    </form>
                </article>
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
  keyId: string = "";

  created() {
    this.getInventory().then(data => {

      for (let key in data){
        this.inventory.push(data[String(key)]);
      }
      console.log(this.inventory);
    });
  }

  getInventory() {
    this.error = false;

    var inventoryArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/inventory.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {
        var i: number = 0;
        for (let key in data){
          data[key].key = key;
          data[key].initialIndex = i;
          i = i + 1;
          inventoryArray.push(data[key]);
          //console.log(key);
        }
        //Remove "" element in array
        inventoryArray.shift();
        //console.log(inventoryArray);
      return inventoryArray;
      
      })
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

    refreshInventory() {
      this.inventory = [];
      this.getInventory().then(data => {
        for (let key in data){
          this.inventory.push(data[String(key)]);
        }
        console.log(this.inventory);  
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

</style>