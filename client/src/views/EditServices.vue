<template>
  <div class="edit-services">
    <div class="add-service">
      <h1 style="font-size:200%; font-weight:bold">Edit Services:</h1>
      <div class="new-service">
        <form v-on:submit.prevent="addService()">
          <h1 style="font-size:120%; font-weight:bold"><u>Add New Service</u></h1>
          <br>
          <p>Title:</p>
          <textarea rows="2" style="width:220px" v-model="seTitle" required></textarea>
          <br><br>
          <p>Price:</p> 
          <textarea rows="2" style="width:220px" v-model="sePrice" required></textarea>
          <br><br>
          <p>Description</p>
          <textarea rows="10" style="width:300px" v-model="seDescription" required></textarea>
          <br>
          <button style="width:20%; margin-left: 240px; margin-top: 20px">Add</button>
        </form>
      </div>
    </div>

    <div class="services">
      <div class="services-list">
      <h1 style="font-size:120%; font-weight:bold"><u>Current Services</u></h1>
      <br>
      <form>
      <article v-for="(a, index) in services" v-bind:key="index">
        <div class="box">
          <button style="margin-left: 550px; " v-on:click="deleteService(a.id)">&times;</button>
          <p> Title: <textarea class="service-desc" rows="1" style="width:180px"  v-model="a.seTitle" required></textarea></p>  
          <p>Price: <textarea class="service-desc" rows="1" style="width:180px" v-model="a.sePrice" required></textarea></p>
          <p>Description:</p>
          <p><textarea class="service-desc" rows="3" style="width:550px" v-model="a.seDescription" required> </textarea></p>
          <button style="margin-left: 500px;" v-on:click="updateService(a.id, a.seTitle, a.sePrice, a.seDescription)">update</button>
        </div>
      </article>
      </form>
      <br><br><br><br><br>
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


    axios.post('https://texanotireshop.firebaseio.com/services/' + this.keyId + '/' + '.json', {
        id: this.services.length+1,
        seTitle: this.seTitle,
        sePrice: this.sePrice,
        seDescription: this.seDescription,
    })
    .then(function (response) {
      console.log(response);
    })
      this.seTitle = "";
      this.sePrice = 0;
      this.seDescription = "";
      this.getAllServices();

    // axios
    //   .post(APIConfig.buildUrl("/newservice"), {
    //     seTitle: this.seTitle,
    //     sePrice: this.sePrice,
    //     seDescription: this.seDescription,
    //   })
    //   .then((response: AxiosResponse) => {
    //     this.newService.push(response.data);
    //     this.$emit("success");
    //     this.seTitle = "";
    //     this.sePrice = 0;
    //     this.seDescription = "";
    //     this.getAllServices();
    //   })
    //   .catch((response: AxiosResponse) => {
    //     console.log("Error creating new deal");
    //   });
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

    // axios
    //   .get(APIConfig.buildUrl("/services"), {
    //     headers: {
    //       token: this.$store.state.userToken
    //     }
    //   })
    //   .then((response: AxiosResponse) => {
    //     this.services = response.data;
    //     console.log(response.data);

    //     axios.post('https://texanotireshop.firebaseio.com/services.json', this.services).then(function(data){
    //   console.log(data);
    //     });


    //     this.$emit("success");
    //   })
    //   .catch((res: AxiosError) => {
    //     this.error = res.response && res.response.data.error;
    //     console.log(this.error);
    //   });
  }

  deleteService(id: number){


    var keyId = this.services[id-1]["key"];

    var servicesKey = this.keyId;

    console.log(servicesKey);

    const axios = require('axios');
    async function makeRequest() {
      let res = await axios.delete('https://texanotireshop.firebaseio.com/services/' + servicesKey + '/' + keyId + '.json');
      console.log(res.status);
    }
    makeRequest();
  
        // axios
        //   .delete(APIConfig.buildUrl("/services/" + id))
        //   .then((response: AxiosResponse) => {
        //     const deletedService = response.data;
        //     this.getAllServices();
        //     this.$emit("success");
        //   })
        //   .catch((response: AxiosResponse) => {
        //     this.error = "bad";
        //   });
  }

    updateService(idd: number, title: string, price: number, desc: string) {


      //TODO:
      //Loop thrugh key to get actual array postion of idd
      //idd will not work if an item is deleted


      var keyId = this.services[idd-1]["key"];
      var servicesKey = this.keyId;

      console.log(price);

    axios.put('https://texanotireshop.firebaseio.com/services/' + servicesKey + '/' + keyId + '.json', {
      id: idd,
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

      //     axios
      // .put(APIConfig.buildUrl("/updateservices/" + id), {
      //   seTitle: title,
      //   sePrice: price,
      //   seDescription: desc
      // })
      // .then((response: AxiosResponse) => {
      //   this.services[id] = response.data;
      //   this.$emit("success");
      // })
      // .catch((response: AxiosResponse) => {
      //   console.log("catch");
      //   this.error = "bad";
      // })


    // axios
    //   .put(APIConfig.buildUrl("/updateservices/" + id), {
    //     seTitle: title,
    //     sePrice: price,
    //     seDescription: desc
    //   })
    //   .then((response: AxiosResponse) => {
    //     this.services[id] = response.data;
    //     this.$emit("success");
    //   })
    //   .catch((response: AxiosResponse) => {
    //     console.log("catch");
    //     this.error = "bad";
    //   })


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
