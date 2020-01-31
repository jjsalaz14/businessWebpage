<template>
    <div class="inventory"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Items Available:</h1><br>

            <div class="margin">
                <article v-for="(a, index) in inventory" v-bind:key="index">
                    <div class="item-box">
                        <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/inventoryTire.png?alt=media&token=7f642799-37ce-4a55-a2af-e88bb25f218e"  width="200" height="200">
                        <div class="item-info">
                            <p>Size:  {{a.size}}</p>
                            <p>Brand:  {{a.brand}}</p>
                            <p>Price:  ${{a.price}}</p>
                            <p>Quantity:  {{a.quantity}}</p>
                            <p>{{a.category}}</p>
                            <button v-if="isLoggedIn">button</button>
                            <button v-if="isLoggedIn">button</button>
                        </div>
                    </div>

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

        for (let key in data){
          inventoryArray.push(data[key]);
          //console.log(key);
        }
        //Remove "" element in array
        inventoryArray.shift();
        //console.log(inventoryArray);
      return inventoryArray;
      
    })
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