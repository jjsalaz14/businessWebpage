<template>
  <div class="edit-services">
      <p>Edit Services Page</p>
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

}
</script>


<style scoped>

</style>
