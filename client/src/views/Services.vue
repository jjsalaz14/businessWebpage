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
    this.getAllServices();
  }

  getAllServices() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/services"), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse) => {
        this.services = response.data;
        console.log(response.data);
        this.$emit("success");
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
        console.log(this.error);
      });
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
