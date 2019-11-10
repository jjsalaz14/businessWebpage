<template>
  <div class="edit-deals">
      <p>Edit Deals Page</p>
  </div>


</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { iDeals } from "../models/deals.interface";

@Component({})
export default class EditDeals extends Vue {
  error: string | boolean = false;
  deals: iDeals[] = [];

}
</script>

<style scoped>

</style>
