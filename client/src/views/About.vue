<template>
  <div class="about">
  <div class="content hours">
    <article v-for="(a, index) in about" v-bind:key="index">
      <div>
        <p>Business Hours: </p>
        <div>Monday: {{a.mHours}}</div>
        <div>Tuesday: {{a.tHours}}</div>
        <div>Wednesday: {{a.wHours}} </div>
        <div>Thursday: {{a.rHours}}</div>
        <div>Friday: {{a.fHours}}</div>
        <div>Saturday: {{a.saHours}}</div>
        <div>Sunday: {{a.suHours}}</div>
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

@Component({})
export default class About extends Vue {
  error: string | boolean = false;
  about: iAbout[] = [];

  created() {
    this.getAllAbout();
  }

  getAllAbout() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/about"), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse) => {
        this.about = response.data;
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
