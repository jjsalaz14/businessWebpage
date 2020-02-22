<template>
    <div class="transactions"> 
        <div class="description">
            <h1 style="font-size:200%; font-weight:bold">Transactions:</h1><br>
            <div class="filter-by">
                <h1><u>Filter By:</u></h1><br>
                <p>Day:</p> 
                    <select v-model="dayChoosen" >
                        <option
                            v-for="selectedDay in allDays"
                            v-bind:key="selectedDay"
                            :value="selectedDay"
                            >{{selectedDay}}
                        </option>
                    </select>
                <!-- <p>Week:</p> 
                    <select v-model="weekChoosen" >
                        <option
                            v-for="selectedWeek in allWeeks"
                            v-bind:key="selectedWeek"
                            :value="selectedWeek"
                            >{{selectedWeek}}
                        </option>
                    </select> -->
                <p>Month:</p> 
                    <select v-model="monthChoosen" >
                        <option
                            v-for="selectedMonth in allMonths"
                            v-bind:key="selectedMonth"
                            :value="selectedMonth"
                            >{{MONTHS[Number(selectedMonth)]}}
                        </option>
                    </select>
                <p>Year:</p> 
                    <select v-model="yearChoosen" >
                        <option
                            v-for="selectedYear in allYears"
                            v-bind:key="selectedYear"
                            :value="selectedYear"
                            >{{selectedYear}}
                        </option>
                    </select>
                <p>Category:</p> 
                    <select v-model="categoryChoosen" >
                        <option
                            v-for="selectedCategory in allCategories"
                            v-bind:key="selectedCategory"
                            :value="selectedCategory"
                            >{{selectedCategory}}
                        </option>
                    </select>
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

@Component({})
export default class Transactions extends Vue {
    transactions: iTransactions[] = [];
    allTransactions: iTransactions[] = [];
    dayChoosen: string = "ALL";
    monthChoosen: string = "ALL";
    yearChoosen: string = "ALL";
    categoryChoosen: string = "ALL";
    weekChoosen: string = "ALL";
    totalRevenue: number = 0;
    totalCost: number = 0;
    totalProfit: number = 0;
    allDays = ["ALL"];
    allMonths = ["ALL"];
    allYears = ["ALL"];
    allWeeks = ["ALL"];
    allCategories = ["ALL", "Expense", "Revenue"]
    MONTHS = ["ALL","January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
    created() {
        this.getTransactions().then(data => {

            for (let key in data){
                this.transactions.push(data[String(key)]);
        }
        console.log(this.allMonths);
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
                self.allDays.push(data[key].date);
                self.allMonths.push(data[key].date.slice(0,2));
                self.allYears.push(data[key].date.slice(6,10));
                
                if(self.dayOfWeek(data[key].date)==1){
                    self.allWeeks.push(data[key].date);
                }
            }
            //Remove "" element in array
            transArray.shift();

            self.allDays = self.uniqueItem(self.allDays);
            self.allMonths = self.uniqueItem(self.allMonths);
            self.allYears = self.uniqueItem(self.allYears);

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

    dayOfWeek(input: string){
        let day = input.slice(3,5)
        let month = this.MONTHS[Number(input.slice(0,2))];
        let year = input.slice(6,10);
        const dayString = new Date(month + ' ' + day + ',' + year + ' 00:00:01');
        const dayNum = dayString.getDay();
        return dayNum;
    }

    filterItems(){

        this.transactions = [];
        var i = 0;
        for(i = 0; i < this.allTransactions.length; i++){
            console.log(this.monthChoosen);
            if(this.monthChoosen == "ALL" || Number(this.allTransactions[i].date.slice(0,2)) == Number(this.monthChoosen)){
                if(this.dayChoosen == "ALL" || this.allTransactions[i].date == this.dayChoosen){
                    if(this.categoryChoosen == "ALL" || this.allTransactions[i].category == this.categoryChoosen){
                        if(this.yearChoosen == "ALL" || this.allTransactions[i].date.slice(6,10) == this.yearChoosen){
                            this.transactions.push(this.allTransactions[i]);
                        }   
                    }
                }
            }
        }
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

