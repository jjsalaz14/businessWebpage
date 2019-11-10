<template>
  <div class="edit-deals">
  <div class="add-deal">
      <h1 style="font-size:200%; font-weight:bold">Edit Coupons and Promotions:</h1>
        <div class="new-deal">
        <form v-on:submit.prevent="addDeal()">
            <h1 style="font-size:120%; font-weight:bold"><u>Add New Deal</u></h1>
            <br>
            <p>Title:</p>
            <textarea rows="2" style="width:220px" v-model="title" required></textarea>
            <br><br>
            <p>Expiration Date:</p>
            <textarea rows="2" style="width:220px" v-model="expiration" required></textarea>
            <br><br>
            <p>Detailed Information:</p>
            <textarea rows="10" style="width:300px" v-model="description" required></textarea>
            <br>
            <button style="width:5%; margin-left: 245px; margin-top: 20px">Add</button>
        </form>
        </div>
  </div>

  <div class="out">
    <p> {{message}}</p>
  </div>
  

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
  newDeal: iDeals[] = [];
  title: string = "";
  expiration: string = "";
  description: string = "";





  message = "---"
  addDeal(){
    this.message = this.title

    axios
      .post(APIConfig.buildUrl("/newdeal"), {
        title: this.title,
        expiration: this.expiration,
        description: this.description,
      })
      .then((response: AxiosResponse) => {
        this.newDeal.push(response.data);
        this.$emit("success");
        this.title = "";
        this.expiration = "";
        this.description = "";
      })
      .catch((response: AxiosResponse) => {
        console.log("Error creating new deal");
      });


  }

}
</script>

<style scoped>

.add-deal {
  padding-top: 44px;
  padding-left: 70px;
}

.new-deal {
  padding-top: 20px;
  padding-left: 50px;
}

</style>
