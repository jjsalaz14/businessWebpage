<template>
    <div v-if="isLoggedIn">
        <div class="add-transaction">
            <p>Add Transaction Page</p>
        </div>
    </div>
</template>
    

<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";


@Component({})
export default class AddTransaction extends Vue {
  error: string | boolean = false;

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
  }
}
</script>

