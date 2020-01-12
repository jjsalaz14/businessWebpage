<template>
  <div class="services">
  <div class="tire-changer">
      <img src="../assets/tireChanger.jpg">
  </div>
  <div class="description">
    <h1 style="font-size:200%; font-weight:bold">Services Information:</h1><br>
      <div>
        <article v-for="(a, index) in services" v-bind:key="index">
          <p> <u>{{a.seTitle}}</u>:  ${{a.sePrice}}</p>
          <p> {{a.seDescription}} </p>
          <br>
        </article>
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
export default class Services extends Vue {
  error: string | boolean = false;
  services: iServices[] = [];

  created() {
    this.getAllServices().then(data => {
      console.log(data[0].length);

      for (var i = 0; i<data[0].length; i++){
        this.services.push(data[0][String(i)]);
      }
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
}
</script>


<style scoped>

.description {
  padding-top: 45px;
  padding-left: 70px;
  padding-right: 650px;
}

.tire-changer {
  padding-top: 90px;
  padding-right: 150px;
  float: right;
  width: 500px;
}

</style>
