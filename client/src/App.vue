<template>
  <div id="app"> 
    <article v-for="(a, index) in about" v-bind:key="index">
      <img class= "car-logo"  src="https://firebasestorage.googleapis.com/v0/b/texanotireshop.appspot.com/o/truck-logo.jpg?alt=media&token=3fd03300-8e47-4a52-8a7b-f7521e0059a6" width="100" height="100"/>
      <!-- src="../src/assets/truck-logo.jpg" -->
      <p class="phone"> {{a.phoneNumber}}</p>
    </article>
    <div v-if="!isLoggedIn" class="shop-name">
      <p> Texano Tire Shop</p>
    </div>
    <div v-if="isLoggedIn" class="shop-name">
      <p> Texano Tire Shop <span style="color:hsl(217, 71%, 53%)">- owner</span></p>
    </div>
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">

 
        <!-- Public Main Screen -->
        <div v-if="!isLoggedIn"> 
          <router-link style="width: 100px;" to="/" tag="button" class="button is-info">Home</router-link>
          <router-link style="width: 100px;" to="/about" tag="button" class="button is-info">Contact</router-link>
          <router-link style="width: 100px;" to="/services" tag="button" class="button is-info">Services</router-link>
          <router-link style="width: 100px;" to="/deals" tag="button" class="button is-info">Deals</router-link>
          <router-link style="width: 100px;" to="/inventory" tag="button" class="button is-info">Inventory</router-link>
          <b-dropdown style="margin-left: 470px" hoverable position="is-bottom-left">
            <button class="button is-info" slot="trigger">
                <span>Log In</span>
            </button>
          <b-dropdown-item custom paddingless>
                  <form @submit.prevent="login">
                    <div class="modal-card" style="width:300px; ">
                      <section class="modal-card-body">
                        <b-notification v-if="loginFailed" type="is-danger">Incorrect ID or Password</b-notification>
                        
                        <b-field label="Username">
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
                            placeholder="Your password"
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

        <!-- Owner Main Screen -->
        <div v-if="isLoggedIn"> 

          <router-link style="width: 100px;" to="/" tag="button" class="button is-info">Home</router-link>

          <b-dropdown hoverable aria-role="list">
            <button style="width: 100px;" class="button is-info" slot="trigger">
                <span>Contact</span>
                
            </button>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/about" exact-active-class="is-active"> Show Contact Info</router-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/edit-about" exact-active-class="is-active"> Edit Contact</router-link>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown hoverable aria-role="list">
            <button style="width: 100px;" class="button is-info" slot="trigger">
                <span>Services</span>
                
            </button>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/services" exact-active-class="is-active"> Show Services</router-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/edit-services" exact-active-class="is-active"> Edit Services</router-link>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown hoverable aria-role="list">
            <button style="width: 100px;" class="button is-info" slot="trigger">
                <span>Deals</span>
                
            </button>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/deals" exact-active-class="is-active"> Deals</router-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/edit-deals" exact-active-class="is-active"> Edit Deals</router-link>
            </b-dropdown-item>
          </b-dropdown>

          <b-dropdown hoverable aria-role="list">
            <button style="width: 100px;" class="button is-info" slot="trigger">
                <span>Inventory</span>
                
            </button>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/inventory" exact-active-class="is-active"> View/Edit Inventory</router-link>
            </b-dropdown-item>
            <b-dropdown-item aria-role="listitem">
              <router-link to="/add-inventory" exact-active-class="is-active"> Add Inventory</router-link>
            </b-dropdown-item>
          </b-dropdown>

        <button style="width: 100px; margin-left: 470px" class="button is-info" v-if="isLoggedIn" v-on:click="logout()">
          Log Out
        </button>

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
import Buefy from "buefy";
Vue.use(Buefy, { defaultIconPack: "fas" });
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { iAbout } from "../src/models/about.interface";
import axios, { AxiosResponse, AxiosError } from "axios";
import { APIConfig } from "../src/utils/api.utils";
import { iUser } from "./models/user.interface";
import { iUserData } from "./models/userData.interface";
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
  userData: iUserData[] = [];
  loginFailed: boolean = false;
  name: string = "";
  role: number = 0;



  signup: LoginForm = {
    emailAddress: "",
    password: ""
  };


  autoSignIn(){
    this.$store.state.userId = 1;
  }

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
    this.getAllAbout().then(data => {
      console.log(data);
      this.about.push(data[0]["0"]);
    });
  }

  getAllAbout() {
    this.error = false;
    var aboutArray = [""];
    

    return axios.get('https://texanotireshop.firebaseio.com/about.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {

        for (let key in data){
          aboutArray.push(data[key]);
          console.log(key);
        }
        //Remove "" element in array
        aboutArray.shift();

      return aboutArray;
      
    })
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

  getUserData(){
    this.error = false

    var userArray = [""];
    return axios.get('https://texanotireshop.firebaseio.com/user.json')
      .then(function(data)  {
        return data.data;}).then(function(data) {
          for (let key in data){
            userArray.push(data[key]);
        }
          // userArray.push(userObj[0].userData);

      userArray.shift();
      return userArray;
      
    })

  }

  login() {
    
    var emailAddress = "";
    var password = "";

    this.getUserData().then(data => {
      console.log("User data");
      console.log(data);

      emailAddress = data[0];
      password = data[4];

      if(this.signup.emailAddress == emailAddress && this.signup.password == password){
        console.log("found username");
        this.$store.state.userId = 1;
        this.signup.emailAddress = "";
        this.signup.password = "";
        this.loginFailed = false;
        this.$router.push({ path: "/" });

      }
      else{
        console.log("Cannot find user with that username");
        this.loginFailed = true;
      }
    });



    //Gets Data Locally
    // axios
    //   .post(APIConfig.buildUrl("/login"), {
    //     emailAddress: this.signup.emailAddress,
    //     password: this.signup.password
    //   })
    //   .then((response: AxiosResponse<LoginResponse>) => {
    //     this.loginFailed = false;
    //     this.$store.commit("login", {
    //       token: response.data.token,
    //       userid: response.data.userId
    //     });
    //     this.$store.commit("changeRole", {
    //       userRole: this.role
    //     });
    //     this.$emit("success");
    //     this.getUserName();
    //     this.$router.push({ path: "/" });
    //   })
    //   .catch((error: AxiosError) => {
    //     this.loginFailed = true;
    //     console.log("Login Error");
    //   });
  }

  logout() {
    this.$store.state.userId = 0;
    this.$router.push({ path: "/" });
    // debugger;
    // axios
    //   .post(APIConfig.buildUrl("/logout"), null, {
    //     headers: { token: this.$store.state.userToken }
    //   })
    //   .then(() => {
    //     this.$store.commit("logout");
    //     this.$router.push({ path: "/" });
    //   });
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
