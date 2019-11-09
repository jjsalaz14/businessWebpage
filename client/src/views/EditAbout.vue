<template>
  <div class="edit-about">
  <div class="content hours">
    <h1> Edit Contact Information: </h1>
    <div class="info">
    <form v-on:submit.prevent="saveAbout()">
        <article class="row-sections">
            <div class="phone">
                <h5>Phone Number:</h5>
                <p><input required type="text" v-model="phone"></p>

            <div class="add">
                <br>
                <h5>Address:</h5>
                <p>Street:</p>
                <p>City:</p>
                <p>State:</p>
                <p>Zipcode:</p>
            </div>
            <div class="address">
                <p><input required type="text" v-model="street"></p>
                <p><input required type="text" v-model="city"></p>
                <p><input required type="text" v-model="state"></p>
                <p><input required type="text" v-model="zipcode"></p>
            </div> 
            </div> 

            <div class="map">
                <img src="../assets/map.png">
            </div>

            <div class="times">
                <p><input required type="text" v-model="mon"></p>
                <p><input required type="text" v-model="tues"></p>
                <p><input required type="text" v-model="wed"></p>
                <p><input required type="text" v-model="thurs"></p>
                <p><input required type="text" v-model="fri"></p>
                <p><input required type="text" v-model="sat"></p>
                <p><input required type="text" v-model="sun"></p>
            </div>

            <div class="week-name">
                <h5>Business Hours</h5>
                <p>Monday:</p>
                <p>Tuesday:</p>
                <p>Wednesday:</p>
                <p>Thursday:</p>
                <p>Friday:</p>
                <p>Saturday:</p>
                <p>Sunday:</p>
            </div>
            
        </article>
        <button style="width:5%; margin-left: 530px; margin-top: 30px">save</button>
    </form>
    </div>
  </div>

  </div>

</template>


<script lang="ts">
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iAbout } from "../models/about.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class EditAbout extends Vue {
  error: string | boolean = false;
  about: iAbout[] = [];
  mon: string = "";
  tues: string = "";
  wed: string = "";
  thurs: string = "";
  fri: string = "";
  sat: string = "";
  sun: string = "";
  phone: string = "";
  street: string = "";
  city: string = "";
  state: string = "";
  zipcode: string = "";


  created() {
    this.getAllAbout();
  }

  getAllAbout() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/about"))
      .then((response: AxiosResponse) => {
        this.about = response.data;
        this.mon = this.about[0].mHours;
        this.tues = this.about[0].tHours;
        this.wed = this.about[0].wHours;
        this.thurs = this.about[0].rHours;
        this.fri = this.about[0].fHours;
        this.sat = this.about[0].saHours;
        this.sun = this.about[0].suHours;
        this.phone = this.about[0].phoneNumber;
        this.street = this.about[0].street;
        this.city = this.about[0].city;
        this.state = this.about[0].stateName;
        this.zipcode = this.about[0].zipcode;


      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
        console.log(this.error);
      });
  }

  saveAbout() {
    console.log("saving about");
    axios
      .put(APIConfig.buildUrl("/about/" + this.about[0].id), {
        mHours: this.mon,
        tHours: this.tues,
        wHours: this.wed,
        rHours: this.thurs,
        fHours: this.fri,
        saHours: this.sat,
        suHours: this.sun,
        phoneNumber: this.phone,
        street: this.street,
        city: this.city,
        stateName: this.state,
        zipcode: this.zipcode
      })
      .then((response: AxiosResponse) => {
        console.log("Updated About Info");
        this.about[0] = response.data;
        this.$emit("success");
      })
      .catch((response: AxiosResponse) => {
        console.log("catch");
        this.error = "bad";
      });
  }


}
</script>


<style scoped>

.content {
  padding-top: 50px;
  padding-left: 35px;
}

.phone {
  float: left;
}
.hours {
  float: left;
  padding-left: 70px;
}

.week-name {
    padding-top: 45px;
    padding-left: 70px;
    float: right;
}

.times{
    float: right;
    padding-top: 80px;
    padding-left: -50px;
}

.title {
    padding-top: 45px;
    padding-left: 80px;
}

.add {
    float: left;
}

.address {
    float: right;
    padding-top: 63px;
}

.info {
    padding-left: 20px;
}

.map {
  width: 450px;
  padding-left: 100px;
  padding-top: 50px;
  float: right;
}

.button {
    padding-top: 10px;
}
</style>
