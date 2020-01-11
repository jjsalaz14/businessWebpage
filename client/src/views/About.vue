<template>
  <div class="about">
  <div class="content hours">
    <h1> Contact Information: </h1>
    <article v-for="(a, index) in about" v-bind:key="index">
      <div class="phone-address">
        <p><u>Phone Number</u>: <br/>
          {{a.phoneNumber}}
          <br/>
          <br/>
          <u>Address</u>: <br/>
          {{a.street}} <br/>
          {{a.city}}, {{a.stateName}} {{a.zipcode}} <br/>
        </p>
      </div>
      <div class="hours">
        <div> <u>Business Hours</u>: </div>
        <div>Monday: {{a.mHours}}</div>
        <div>Tuesday: {{a.tHours}}</div>
        <div>Wednesday: {{a.wHours}} </div>
        <div>Thursday: {{a.rHours}}</div>
        <div>Friday: {{a.fHours}}</div>
        <div>Saturday: {{a.saHours}}</div>
        <div>Sunday: {{a.suHours}}</div>
      </div>
      <div class="map">
        <img src="../assets/map.png">
      </div>
    </article>
  </div>

  </div>

</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iAbout } from "../models/about.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import { log } from "util";
import { isAbsolute } from "path";

@Component({})

export default class About extends Vue {
  error: string | boolean = false;
  about: iAbout[] = [];  

  created() {

    this.getAllAbout().then(data => {
      console.log(data);
      this.about.push(data[0]["0"]);
    });


  }


  getAllAbout() {
    this.error = false;    

    var aboutArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/about.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          aboutArray.push(data[key]);
          console.log(key);
        }
        //Remove "" element in array
        aboutArray.shift();

      return aboutArray;
      
    })
  }



  
}
</script>


<style scoped>

.content {
  padding-top: 50px;
  padding-left: 35px;
}

.phone-address {
  float: left;
}
.hours {
  float: left;
  padding-left: 70px;
}
.map {
  width: 500px;
  float: left;
  padding-left: 150px;
}
</style>
