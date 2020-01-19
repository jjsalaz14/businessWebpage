<template>
  <div v-if="isLoggedIn">
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
                <img src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/map.png?alt=media&token=de0a908e-7468-45ed-8733-87442e180c9c">
                <!-- src="../assets/map.png" -->
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
  keyId: string = "";


  created() {
    this.getAllAbout().then(data => {
      console.log(data[0]["id"]);
      this.keyId = data[0]["id"];
      this.about.push(data[0]["0"]);
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

    });
  }

  getAllAbout() {
    this.error = false;

    var aboutArray = [""];
    var keyVal = "";



    // axios
    // .get(APIConfig.buildUrl("/about"), 
    // {headers: {	    
    //       token: this.$store.state.userToken
    // }
    // })
    // .then((response: AxiosResponse) => {
    //   this.about = response.data;
    // axios.post('https://texanotireshop.firebaseio.com/about.json', this.about).then(function(data){
    //   console.log(data);
    // });

    //   this.$emit("success");
    // })
    

    return axios.get('https://texanotireshop.firebaseio.com/about.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          data[key].id = key;
          aboutArray.push(data[key]);
          console.log("key ", key);
          keyVal = key;
        }
        //Remove "" element in array
        aboutArray.shift();

      return aboutArray;
      
    })
  }

  saveAbout() {

    this.about[0].mHours =  this.mon,
    this.about[0].tHours = this.tues,
    this.about[0].wHours = this.wed,
    this.about[0].rHours = this.thurs,
    this.about[0].fHours = this.fri,
    this.about[0].saHours = this.sat,
    this.about[0].suHours = this.sun,
    this.about[0].phoneNumber = this.phone,
    this.about[0].street = this.street,
    this.about[0].city = this.city,
    this.about[0].stateName = this.state,
    this.about[0].zipcode = this.zipcode


    axios.put('https://texanotireshop.firebaseio.com/about/' + this.keyId + '/0.json', {
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
      zipcode: this.zipcode,
      id: 1
   
    })
    .then(function (response) {
      console.log(response);
    })


    // axios.post('https://texanotireshop.firebaseio.com/about.json', this.about).then(function(data){
    //   console.log(data);
    // });
    // console.log("saving about");
    // axios
    //   .put(APIConfig.buildUrl("/about/" + this.about[0].id), {
    //     mHours: this.mon,
    //     tHours: this.tues,
    //     wHours: this.wed,
    //     rHours: this.thurs,
    //     fHours: this.fri,
    //     saHours: this.sat,
    //     suHours: this.sun,
    //     phoneNumber: this.phone,
    //     street: this.street,
    //     city: this.city,
    //     stateName: this.state,
    //     zipcode: this.zipcode
    //   })
    //   .then((response: AxiosResponse) => {
    //     console.log("Updated About Info");
    //     this.about[0] = response.data;
    //     this.$emit("success");
    //   })
    //   .catch((response: AxiosResponse) => {
    //     console.log("catch");
    //     this.error = "bad";
    //   });
  }

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
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
