<template>
  <div id="app"> 
    <article v-for="(a, index) in about" v-bind:key="index">
      <img class= "car-logo" src="../src/assets/truck-logo.jpg" width="100" height="100"/>
      <p class="phone"> {{a.phoneNumber}}</p>
    </article>
    <div class="shop-name">
      <p> Texano Tire Shop</p>
    </div>
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">
          <div>
            <router-link class="navbar-item is-tab" to="/" exact-active-class="is-active">Home</router-link> 
          </div>
          <div>
            <router-link class="navbar-item is-tab" to="/about" exact-active-class="is-active">Contact</router-link> 
            <router-link class="navbar-item is-tab" to="/edit-about" exact-active-class="is-active">Edit Contact</router-link>
          </div>
          <div>
            <router-link class="navbar-item is-tab" to="/services" exact-active-class="is-active">Services</router-link> 
             <router-link class="navbar-item is-tab" to="/edit-services" exact-active-class="is-active">Edit Services</router-link> 
          </div>
        <div>
          <router-link class="navbar-item is-tab" to="/deals" exact-active-class="is-active">Deals</router-link> 
          <router-link class="navbar-item is-tab" to="/edit-deals" exact-active-class="is-active">Edit Deals</router-link>  
        </div>
        
        
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <Signup v-bind:is-showing="showSignup" v-on:success="successSignup()" v-on:cancel="cancelSignup()"/>
    <Login v-bind:is-showing="showLogin" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { iAbout } from "../src/models/about.interface";
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../src/utils/api.utils";

@Component({
  components: {
    Signup,
    Login
  }
})
export default class App extends Vue {
  public showSignup: boolean = false;
  public showLogin: boolean = false;

  error: string | boolean = false;
  about: iAbout[] = [];

  created() {
    this.getAllAbout();
  }

  getAllAbout() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/"), {
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

  showSignupModal() {
    this.showSignup = true;
  }
  successSignup() {
    this.showSignup = false;
  }
  cancelSignup() {
    this.showSignup = false;
  }
  showLoginModal() {
    this.showLogin = true;
  }
  successLogin() {
    this.showLogin = false;
  }
  cancelLogin() {
    this.showLogin = false;
  }
  
}
</script>


<style lang="scss">
@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.car-logo {
  float: left;
  padding-left: 10px;
  padding-top: 10px;
}

.phone {
  float: right;
  padding-top: 45px;
  padding-right: 20px;
}

.shop-name {
  padding-top: 25px;
  font-size: 200%;
  padding-left: 120px;
  font-family: "Times New Roman", Times, serif;
}

.navbar {
  // padding-top: .1px;
  display: block;
  background-color: hsl(217, 71%, 53%);
  font-weight: bold;
}


</style>
