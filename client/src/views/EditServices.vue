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
  sePrice: number = null;
  seDescription: string = "";


  addService(){
    axios
      .post(APIConfig.buildUrl("/newservice"), {
        seTitle: this.seTitle,
        sePrice: this.sePrice,
        seDescription: this.seDescription,
      })
      .then((response: AxiosResponse) => {
        this.newService.push(response.data);
        this.$emit("success");
        this.seTitle = "";
        this.sePrice = null;
        this.seDescription = "";
      })
      .catch((response: AxiosResponse) => {
        console.log("Error creating new deal");
      });
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

</style>
