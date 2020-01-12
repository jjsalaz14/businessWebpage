<template>
  <div class="edit-deals">
    <div class="add-deal">
      <h1 style="font-size:200%; font-weight:bold">Edit Coupons and Promotions:</h1>
      <div class="new-deal">
        <form v-on:submit.prevent="addDeal()">
          <h1 style="font-size:120%; font-weight:bold"><u>Add New Deal</u></h1>
          <br>
          <p>Title:</p>
          <textarea rows="2" style="width:220px" v-model="title" required></textarea>
          <br><br>
          <p>Expiration Date:</p> 
          <textarea rows="2" style="width:220px" v-model="expiration" required></textarea>
          <br><br>
          <p>Detailed Information:</p>
          <textarea rows="10" style="width:300px" v-model="description" required></textarea>
          <br>
          <button style="width:10%; margin-left: 255px; margin-top: 20px">Add</button>
        </form>
      </div>
  </div>
  <div class="deals">
    <div class="deals-list">
      <h1 style="font-size:120%; font-weight:bold"><u>Current Deals</u></h1>
      <br>
      <article v-for="(a, index) in deals" v-bind:key="index">
        <div class="box">
           <button style="margin-left: 550px; " v-on:click="deleteDeal(a.id)">&times;</button>
          <p> <u>{{a.title}}</u>:  Good Before: {{a.expiration}}</p>
          <p> {{a.description}} </p>
        </div>
      </article>
      <br><br><br><br><br>
   </div>
  </div>
</div>


</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iDeals } from "../models/deals.interface";

@Component({})
export default class EditDeals extends Vue {
  error: string | boolean = false;
  deals: iDeals[] = [];
  newDeal: iDeals[] = [];
  title: string = "";
  expiration: string = "";
  description: string = "";
  keyId: string = "";

  deleteDeal(id: number){
        axios
          .delete(APIConfig.buildUrl("/deals/" + id))
          .then((response: AxiosResponse) => {
            const deletedDeals = response.data;
            this.getAllDeals();
            this.$emit("success");
          })
          .catch((response: AxiosResponse) => {
            this.error = "bad";
          });
  }

  addDeal(){
    axios
      .post(APIConfig.buildUrl("/newdeal"), {
        title: this.title,
        expiration: this.expiration,
        description: this.description,
      })
      .then((response: AxiosResponse) => {
        this.newDeal.push(response.data);
        this.$emit("success");
        this.title = "";
        this.expiration = "";
        this.description = "";
      })
      .catch((response: AxiosResponse) => {
        console.log("Error creating new deal");
      });
  }

    created() {
    this.getAllDeals().then(data => {
      console.log(data);
      this.keyId = data[0]["id"];

      for (let key in data["0"]){
          if(key != "id"){
            console.log(key);
            data[0][key].key = key;
            this.deals.push(data[0][key]);
          }
      }
      console.log(this.deals);
    });
  }

  getAllDeals() {
    this.error = false;

    var dealsArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/deals.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          data[key].id = key;
          dealsArray.push(data[key]);
        }
        //Remove "" element in array
        dealsArray.shift();

      return dealsArray;
      
    })

    // axios
    //   .get(APIConfig.buildUrl("/deals"), {
    //     headers: {
    //       token: this.$store.state.userToken
    //     }
    //   })
    //   .then((response: AxiosResponse) => {
    //     this.deals = response.data;
    //     console.log(response.data);
    //     this.$emit("success");
    //   })
    //   .catch((res: AxiosError) => {
    //     this.error = res.response && res.response.data.error;
    //     console.log(this.error);
    //   });
  }

}
</script>

<style scoped>

.add-deal {
  padding-top: 44px;
  padding-left: 70px;
  float: left;
}

.new-deal {
  padding-top: 20px;
  padding-left: 50px;
}

.deals-list{
  padding-top: 112px;
  padding-left: 5px;
  padding-right: 80px;
  float: right;
}

.box {
  width: 600px;
  padding: 10px;
  border: 1px solid gray;
  margin: 0;
}



</style>
