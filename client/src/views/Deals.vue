<template>
  <div class="deals">
  <div class="description">
    
      <div>
        <div class="image">
          <img src="../assets/inflatedImage.png">
        </div>
        <div class="image-2">
          <img src="../assets/inflatedImage.png">
        </div>
        <div class="deals-list">
          <h1 style="font-size:200%; font-weight:bold">Current Coupons and Promotions:</h1><br>
        <article v-for="(a, index) in deals" v-bind:key="index">
          <p> <u>{{a.title}}</u>:  Good Before: {{a.expiration}}</p>
          <p> {{a.description}} </p>
          <br>
        </article>
        </div>

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
export default class Deals extends Vue {
  error: string | boolean = false;
  deals: iDeals[] = [];

  created() {
    this.getAllDeals().then(data => {
      console.log(data[0]);

      for (let key in data["0"]){
          if(key != "id"){
            this.deals.push(data[0][key]);
          }
        }
    });
  }

  getAllDeals() {
    this.error = false;

    var dealsArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/deals.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          dealsArray.push(data[key]);
          console.log(key);
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

    //     axios.post('https://texanotireshop.firebaseio.com/deals.json', this.deals).then(function(data){
    //   console.log(data);
    //     });

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

.description {
  padding-top: 50px;
  text-align: center;
}

.image {
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 5px;
    width: 20%;
    float: left;
    -ms-transform: rotate(315deg); 
    -webkit-transform: rotate(315deg); 
    transform: rotate(315deg); 
}
.image-2 {
    padding-top: 50px;
    padding-left: 5px;
    padding-right: 10px;
    width: 20%;
    float: right;
    -ms-transform: rotate(45deg); 
    -webkit-transform: rotate(45deg); 
    transform: rotate(45deg); 
}

.deals-list {
  padding-top: 20px;
  padding-left: 0px;
  padding-right: 10px;
}

</style>
