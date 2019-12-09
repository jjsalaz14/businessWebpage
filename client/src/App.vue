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
             <router-link class="navbar-item is-tab" to="/edit-services" exact-active-class="is-active" v-if="isLoggedIn">Edit Services</router-link> 
          </div>
        <div>
          <router-link class="navbar-item is-tab" to="/deals" exact-active-class="is-active">Deals</router-link> 
          <router-link class="navbar-item is-tab" to="/edit-deals" exact-active-class="is-active">Edit Deals</router-link> 

        </div>
        
        <b-dropdown v-if="!isLoggedIn" position="is-bottom-left">
        <a class="navbar-item is-info" slot="trigger">
          <span>
            Log In
            <span class="icon is-small is-left">
              <i class="fas fa-caret-down"></i>
            </span>
          </span>
        </a>
        <b-dropdown-item custom paddingless>
                <form @submit.prevent="login">
                  <div class="modal-card" style="width:300px; ">
                    <section class="modal-card-body">
                      <b-notification v-if="loginFailed" type="is-danger">Incorrect ID or Password</b-notification>
                      
                      <b-field label="employee id">
                        <b-input
                          v-model="signup.emailAddress"
                          type="text"
                          placeholder="Username"
                          required
                        ></b-input>
                      </b-field>

                      <b-field label="Password">
                        <b-input
                          v-model="signup.password"
                          type="password"
                          password-reveal
                          placeholder="your password"
                          required
                        ></b-input>
                      </b-field>

                    </section>
                    <footer class="modal-card-foot">
                      <button
                        class="button is-primary is-focused"
                        style="width:100%"
                      >login</button>
                    </footer>
                  </div>
                </form>
              </b-dropdown-item>
        </b-dropdown>
        </div>

        <div>
        <!-- <hr class="navbar-divider"> -->
        <button  v-if="isLoggedIn" v-on:click="logout()">
          log out
        </button>
        <!-- <b-dropdown custom paddingless>
          <b-dropdown-item class="menu-selectors" v-on:click="logout()">
            <span class="navicon">
            </span>
            Log Out
          </b-dropdown-item>
        </b-dropdown> -->
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
import Buefy from "buefy";
Vue.use(Buefy, { defaultIconPack: "fas" });
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { iAbout } from "../src/models/about.interface";
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../src/utils/api.utils";
import { iUser } from "./models/user.interface";
import { log } from "util";

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
  loginFailed: boolean = false;
  name: string = "";
  role: number = 0;


  signup: LoginForm = {
    emailAddress: "",
    password: ""
  };

  getUserName() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl("/users/" + this.$store.state.userId))
      .then((response: AxiosResponse) => {
        this.name = response.data.user.firstName;
        this.$emit("success");
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
        console.log("[app.vue]" + this.error);
        console.log("error getting username");
      });
}

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

  get isLoggedIn(): boolean {
    return !!this.$store.state.userId;
  }

  login() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/login"), {
        emailAddress: this.signup.emailAddress,
        password: this.signup.password
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        this.loginFailed = false;
        this.$store.commit("login", {
          token: response.data.token,
          userid: response.data.userId
        });
        this.$store.commit("changeRole", {
          userRole: this.role
        });
        this.$emit("success");
        this.getUserName();
        this.$router.push({ path: "/" });
      })
      .catch((error: AxiosError) => {
        this.loginFailed = true;
        console.log("Login Error");
      });
  }

  logout() {
    debugger;
    axios
      .post(APIConfig.buildUrl("/logout"), null, {
        headers: { token: this.$store.state.userToken }
      })
      .then(() => {
        this.$store.commit("logout");
        this.$router.push({ path: "/" });
      });
  }


}

interface LoginResponse {
  token: string;
  userId: number;
  role: number;
}

export interface LoginForm {
  emailAddress: string;
  password: string;
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
