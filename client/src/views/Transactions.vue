<template>
    <div v-if="isLoggedIn" class="transactions"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Transactions:</h1><br>
            <p v-if="error" style="color:red">{{errorMsg}}</p>
            <div class="filter-by">
                <h1><u>Filter By:</u></h1><br>

                <p>Category:</p> 
                    <select v-model="categoryChoosen" @change="onChange()">
                        <option
                            v-for="selectedCategory in allCategories"
                            v-bind:key="selectedCategory"
                            :value="selectedCategory"
                            >{{selectedCategory}}
                        </option>
                    </select>
              <br>
              <div>
                <form v-on:submit.prevent="filterItems()">
                    <p>Start Date:</p>
                    <textarea placeholder="MM/DD/YYYY" rows="2" style="width:120px" v-model="startDate" required ></textarea>
                    <p>End Date:</p>
                    <textarea placeholder="MM/DD/YYYY" rows="2" style="width:120px" v-model="endDate" required ></textarea>
                    <div>
                        <button type="button" style="margin-left: 0px;border-radius: 12px;" v-on:click="showAll()">Show All</button>
                        <button style="margin-left: 20px;border-radius: 12px;">Filter</button>
                    </div>
                </form>
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
                        <td v-if="a.category=='Expense'" style="color:red">{{a.date}}</td>
                        <td v-if="a.category=='Revenue'" style="color:green">{{a.date}}</td>
                        <td v-if="a.category=='Expense'" style="color:red">{{a.description}}</td>
                        <td v-if="a.category=='Revenue'" style="color:green">{{a.description}}</td>
                        <td v-if="a.category=='Expense'" style="color:red">{{a.quantity}}</td>
                        <td v-if="a.category=='Revenue'" style="color:green">{{a.quantity}}</td>
                        <td v-if="a.category=='Expense'" style="color:Red"> ${{a.amount}}</td>
                        <td v-if="a.category=='Revenue'" style="color:green"> ${{a.amount}}</td>
                    </tr>
                                                    
                </table>
                <br><br>
                    <table id="summary">
                        <tr>
                            <th>Total Revenue</th>
                            <th>${{this.getRevenue()}}</th>
                        </tr>
                        <tr>
                            <td>Total Expenses</td>
                            <td>${{this.getExpenses()}}</td>
                        </tr>
                        <tr>
                            <td>Total Profit</td>
                            <td>${{this.getTotalProfit()}}</td>
                        </tr>
                    </table>
                    
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iTransactions } from "../models/transactions.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import { log } from "util";
import moment from 'moment';

@Component({})
export default class Transactions extends Vue {
    transactions: iTransactions[] = [];
    allTransactions: iTransactions[] = [];
    categoryChoosen: string = "ALL";
    totalRevenue: number = 0;
    totalCost: number = 0;
    totalProfit: number = 0;
    startDate: string = "";
    endDate: string = "";
    allCategories = ["ALL", "Expense", "Revenue"]
    errorMsg: string = "";
    error: Boolean = false;

    created() {
        this.getTransactions().then(data => {

            for (let key in data){
                this.transactions.push(data[String(key)]);
        }
        this.allTransactions = this.transactions;
        });
    }


    getTransactions() {
        var transArray = [""];
        var self = this;
    
        return axios.get('https://texanotireshop.firebaseio.com/transactions.json')
        .then(function(data)  {
            return data.data;}).then(function(data) {
            var i: number = 0;
            for (let key in data){
                transArray.push(data[key]);
                i =  i + 1;
            }
            //Remove "" element in array
            transArray.shift();

        return transArray;
      
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

    
    getTotalProfit(){
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

    filterItems(){

        if(!moment(this.startDate, "MM/DD/YYYY", true).isValid()){
            this.error = true;
            this.errorMsg = "Invalid Start Date";
        }
        else if(!moment(this.endDate, "MM/DD/YYYY", true).isValid()){
            this.error = true;
            this.errorMsg = "Invalid End Date";
        }
        else {

            let start = new Date(this.startDate);
            let end = new Date(this.endDate);
            if(start>end){
                this.error = true;
                this.errorMsg = "End Date Should Be Greater Than Or Equal To Start Date"
            }
            else{
                this.error = false;
                this.errorMsg = "";

                this.transactions = [];

                var i = 0;
                for(i = 0; i < this.allTransactions.length; i++){
                    if(this.categoryChoosen == "ALL" || this.allTransactions[i].category == this.categoryChoosen){  
                        let givenDay = new Date(this.allTransactions[i].date);
                        if(start <= givenDay && givenDay <= end){
                            this.transactions.push(this.allTransactions[i]);
                        }   
                    }
                }
            }
        }
    }

    onChange(){  
        if(this.endDate!="" && this.startDate!= ""){
            this.filterItems();
        }
        else {    
            this.transactions = [];
            var i = 0;
            for(i = 0; i < this.allTransactions.length; i++){
                if(this.categoryChoosen == "ALL" || this.allTransactions[i].category == this.categoryChoosen){
                    this.transactions.push(this.allTransactions[i]);
                }   
            }
        }
    }

    showAll(){
        this.transactions = [];
        this.transactions = this.allTransactions;
        this.categoryChoosen = "ALL"
        this.startDate = "";
        this.endDate = "";
    }

    get isLoggedIn(): boolean {
        return !!this.$store.state.userId;
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

    #summary th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        border: 1px solid #ddd;
        padding: 8px;
    }
    #summary td, #data th {
        border: 1px solid #ddd;
        padding: 8px;
        font-weight: bold;
    }
    
</style>

