<template>
<!-- v-if="isLoggedIn" -->
    <div >
        <div class="add-transaction">
            <div>
                <h1 style="font-size:200%; font-weight:bold">New Transaction:</h1>
                <div class="new-transaction">
                    <form v-on:submit.prevent="addToCart()">
                    <h1 style="font-size:120%; font-weight:bold"><u>Add New Transaction</u></h1>
                    <br>
                    <p>Type:</p> 
                    <select required v-model="category">
                        <option disabled value="">Select Type Of Transaction</option>
                        <option>expense</option>
                        <option>revenue</option>
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
    </div>
</template>
    

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iServices } from "../models/services.interface";
import { log } from "util";


@Component({})
export default class AddTransaction extends Vue {
    error: string | boolean = false;
    description: string = "";
    amount: number = 0;
    category: string = "";
    date: string = "";
    inventoryId: string = "";
    quantity: number = 0;
    services = [""];

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


  addToCart(){
      console.log("Add to cart");
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
</style>

