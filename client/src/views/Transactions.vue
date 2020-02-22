<template>
    <div class="transactions"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Transactions:</h1><br>
            <div class="filter-by">
                <h1><u>Filter By:</u></h1><br>
 
              <div>
                <button type="button" style="margin-left: 100px;border-radius: 12px;" v-on:click="filterItems()">Filter</button>
              </div>
            </div>
            <div style="padding-left:300px;">
                <table id="data">
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    <tr v-for="(a, index) in transactions" v-bind:key="index">
                        <td>{{a.date}}</td>
                        <td>{{a.description}}</td>
                        <td>{{a.quantity}}</td>
                        <td>$: {{a.amount}}</td>
                    </tr>
                                                    
                </table>
                <br><br>
                <p>Total Revenue: </p>
                <p>Total Cost: </p>
                <p>Total Profit: </p>
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iTransactions } from "../models/transactions.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Transactions extends Vue {
    transactions: iTransactions[] = [];
    allTransactions: iTransactions[] = [];
    created() {
        this.getTransactions().then(data => {

            for (let key in data){
                this.transactions.push(data[String(key)]);
        }
        console.log(this.transactions);
        this.allTransactions = this.transactions;
        });
    }


    getTransactions() {
        var transArray = [""];
        var self = this;
    
        return axios.get('https://texanotireshop.firebaseio.com/transactions.json')
        .then(function(data)  {
            return data.data;}).then(function(data) {

            for (let key in data){
            transArray.push(data[key]);
            }
            //Remove "" element in array
            transArray.shift();

        return transArray;
      
    })

    }


}
</script>


<style scoped>
    .description {
        padding-top: 45px;
        padding-left: 70px;
    }
    .filter-by {
      float: left;
      border: 1px solid black;
      padding: 20px;
    }

    #data th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: rgb(88, 157, 235);
        color: white;
    }
    #data td, #data th {
        border: 1px solid #ddd;
        padding: 8px;
    }
    
</style>

