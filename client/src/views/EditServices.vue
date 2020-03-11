<template>
  <div v-if="isLoggedIn">
  <div class="edit-services">
    <div class="add-service">
      <h1 style="font-size:200%; font-weight:bold">Edit Services:</h1>
      <div class="new-service">
        <form v-on:submit.prevent="addService()">
          <h1 style="font-size:120%; font-weight:bold"><u>Add New Service</u></h1>
          <br>
          <p>Title:</p>
          <textarea class="title" rows="2" style="width:220px; font-size:12px" v-model="seTitle" required></textarea>
          <br><br>
          <p>Price:</p> 
          <textarea rows="2" class="price" style="width:220px" v-model="sePrice" required></textarea>
          <br><br>
          <p>Description</p>
          <textarea rows="10" class="description" style="width:300px" v-model="seDescription" required></textarea>
          <br>
          <button style="width:20%; margin-left: 240px; margin-top: 20px">Add Service</button>
        </form>
      </div>
    </div>

    <div class="services">
      <div class="services-list">
      <h1 style="font-size:120%; font-weight:bold"><u>Current Services</u></h1>
      <br>
      <form>
      <article class="servs" v-for="(a, index) in services" v-bind:key="index">
        <div class="box">
          <button type="button" style="margin-left: 510px; " v-on:click="deleteService(a.id, index)">delete</button>
          <p> Title: <textarea class="title-update" rows="1" style="width:180px"  v-model="a.seTitle" required></textarea></p>  
          <p>Price: <textarea class="service-desc" rows="1" style="width:180px" v-model="a.sePrice" required></textarea></p>
          <p>Description:</p>
          <p><textarea class="desc-update" rows="3" style="width:550px" v-model="a.seDescription" required> </textarea></p>
          <button type="button" style="margin-left: 500px;" v-on:click="updateService(a.id, a.seTitle, Number(a.sePrice), a.seDescription, index)">updates</button>
        </div>
      </article>
      </form>
      <br><br><br><br><br>
      </div>
    </div>
  </div>
  </div>
</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iServices } from "../models/services.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class EditServices extends Vue {
  error: string | boolean = false;
  services: iServices[] = [];
  newService: iServices[] = [];
  seTitle: string = "";
  sePrice: number = 0;
  seDescription: string = "";
  keyId: string = "";


  addService(){

    var self = this;
    axios.post('https://texanotireshop.firebaseio.com/services/' + this.keyId + '/' + '.json', {
        id: this.services.length+1,
        seTitle: this.seTitle,
        sePrice: this.sePrice,
        seDescription: this.seDescription,
    })
    .then(function (response) {
      console.log(response);
      self.seTitle = "";
      self.sePrice = 0;
      self.seDescription = "";
      self.refreshServices();
    })

  }

  getServicesLength(){
    return this.services.length
  }

  created() {
    // this.getAllServices();
    this.getAllServices().then(data => {
      console.log("data");
      this.keyId = data[0]["id"];

      for (let key in data["0"]){
          if(key != "id"){
            data[0][key].key = key;
            this.services.push(data[0][key]);
          }
      }

      console.log(this.services);
    });
  }
  getAllServices() {
    this.error = false;

    var servicesArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/services.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          data[key].id = key;
          servicesArray.push(data[key]);
          console.log(key);
        }
        //Remove "" element in array
        servicesArray.shift();

      return servicesArray;
      
    })

  }

  refreshServices() {
    this.services = [];
    this.getAllServices().then(data => {
      console.log("data");
      this.keyId = data[0]["id"];

      for (let key in data["0"]){
          if(key != "id"){
            data[0][key].key = key;
            this.services.push(data[0][key]);
          }
      }

      console.log(this.services);
    });
  }

  deleteService(id: number, index: number){

    var self = this;
    var keyId = this.services[index]["key"];

    var servicesKey = this.keyId;

    console.log(servicesKey);

    const axios = require('axios');
    async function makeRequest() {
      let res = await axios.delete('https://texanotireshop.firebaseio.com/services/' + servicesKey + '/' + keyId + '.json');
      console.log(res.status);
      self.refreshServices();
    }
    makeRequest();
  
  }

    updateService(id: number, title: string, price: number, desc: string, index: number) {
      // var keyId = this.services[id-1]["key"];
      var keyId = this.services[index]["key"];
      var servicesKey = this.keyId;


    axios.put('https://texanotireshop.firebaseio.com/services/' + servicesKey + '/' + keyId + '.json', {
      id: id,
      seDescription: desc,
      sePrice: price,
      seTitle: title,
    })
    .then(function (response) {
      console.log("sucess");
    })
    .catch(function(error){
    console.log("error");
    console.log(error);
    });

    }

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
  }


}
</script>


<style scoped>

.add-service {
  padding-top: 44px;
  padding-left: 70px;
  float: left;
}

.new-service {
  padding-top: 20px;
  padding-left: 50px;
}

.services-list{
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

.service-desc {
  font-size: 14px; 
}

</style>
