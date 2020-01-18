<template>
  <div class="services">
  <div class="tire-changer">
      <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/tireChanger.jpg?alt=media&token=ac0b002d-9fea-47c5-b425-ef67e1d23b62">
      <!-- src="../assets/tireChanger.jpg" -->
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

      for (let key in data["0"]){
          //this.services.push(data[0][key]);
          if(key != "id"){
            this.services.push(data[0][key]);
          }
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
