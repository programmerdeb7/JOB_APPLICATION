<template>
  <div id="app">
    <!-- Navbar Start -->
    <b-navbar id="navbar" fixed="top">
      <b-container>
        <b-navbar-brand href="#" id="navbarBrand" to="/">
          JOB 
          <vue-typed-js :strings="['<b>IN..</b>']" :loop="true" :showCursor="false" id="navTypeJs">
            <span class="typing"></span>
          </vue-typed-js>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto" id="navbarRight">
          <b-nav-item to="add" id="govtLink"><b-spinner type="grow" label="Spinning" v-if="spiner['add']"></b-spinner>NEW</b-nav-item>
          <b-nav-item to="govt" id="govtLink"><b-spinner type="grow" label="Spinning" v-if="spiner['govt']"></b-spinner>GOVT</b-nav-item>
          <b-nav-item to="private" id="privateLink"><b-spinner type="grow" label="Spinning" v-if="spiner['private']"></b-spinner>PRIVATE</b-nav-item>
        </b-navbar-nav>
      </b-container> 
    </b-navbar>
    <!-- Navbar End -->
    <!-- Log -->
    <div id="contentSection" v-show="!this.switch">
      <b-container>
        <b-row>
          <b-col offset-md="3" md="6" sm="12">
            <b-card>
              <div class="text-center" id="logTitle">LOG IN</div>
              <b-form>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="inline-form-input-username" v-model="user" placeholder="USERNAME" type="text" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="inline-form-input-username" v-model="pass" placeholder="PASSWORD" type="password" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-button type="submit" @click="signIn()" block variant="primary">LOG</b-button>
              </b-form>
            </b-card>
            <div id="newAccount" class="text-center" @click="signup=true">CREATE NEW ACCOUNT</div>
            <b-card v-show="signup">
              <div class="text-center" id="logTitle">SIGN UP</div>
              <b-form>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="inline-form-input-username" v-model="user" placeholder="USERNAME" type="text" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="inline-form-input-username" v-model="pass" placeholder="PASSWORD" type="password" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-button type="submit" @click="signUp()" block variant="success">SIGN UP</b-button>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- Log -->
    <router-view v-on:govt="govtHover" v-on:private="privateHover" v-on:add="addHover" v-show="this.switch" :user="user"/>
  </div>
</template>
<script>
import Vue from 'vue';
import VueTypedJs from 'vue-typed-js';
import { db, logInfo } from './firebase.js';
Vue.use(VueTypedJs);
export default {
  name: 'app',
  data: function(){
    return {
      jobRetriveData: [],
      spiner: {
        govt: false,
        private: false,
        add: false
      },
      user: this.getCookie('user'),
      pass: this.getCookie('pass'),
      switch: false,
      signup: false
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('logInfo')
    }
  },
  methods: {
    govtHover: function(value){
      if(value == true){
        this.spiner['govt'] = true;
      }
      if(value == false){
        this.spiner['govt'] = false;
      }
    },
    privateHover: function(value){
      if(value == true){
        this.spiner['private'] = true;
      }else if(value == false){
        this.spiner['private'] = false;
      }else{
        this.spiner['private'] = true;
      }
    },
    addHover: function(value){
      if(value == true){
        this.spiner['add'] = true;
      }else if(value == false){
        this.spiner['add'] = false;
      }else{
        this.spiner['add'] = true;
      }
    },
    setCookie: function(cookie_user, cookie_pass, exdays){
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cookie_user + "=" + cookie_pass + ";" + expires + ";path=/";
      return true;
      this.setCookie('jobType', value , 365);
    },
    getCookie: function(cookie_name){
      var name = cookie_name + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    },
    signIn: function() {
      this.setCookie('user', this.user , 365);
      this.setCookie('pass', this.pass , 365);
      location.reload();
    }
  },
  watch: {
    'jobRetriveData': function(){
      if(this.jobRetriveData.length > 0){
        for(var i = 0; i <= this.jobRetriveData.length; i++){
          if(this.jobRetriveData[i]['user'] == this.user){
            if(this.jobRetriveData[i]['pass'] == this.pass){
              this.switch = true;
            }
          }else{
            this.switch = false;
          }
        }
      }
    }
  }
}
</script>
<style>
/** Global Fonts */
* {
  font-family: 'Montserrat', sans-serif;
}
/** Hide Scroll Bar */
::-webkit-scrollbar { 
  display: none; 
}

/** Header */
h1 {
  font-size: 2.5rem; 
}
h1,
h2,
h3,
h4,
h5 {
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: -.03rem; 
  color:#444;
}
#link{
  font-weight: 500;
  color: #00789a;
}

/** Navbar Design Start */
#navbar{
  background-color: #fff;
  padding: 20px 15px;
  border-bottom: 1px solid #d2d2d2;
}

#navbar #navbarBrand{
  text-transform: capitalize;
  font-size: 1rem;
  margin-left: 20px;
}
#navbarBrand #navTypeJs{
  display: inline-block;
}

#navbar #navbarRight{
  margin-right: 20px;
}
#navbarRight #govtLink, #expLink, #portfolioLink, #privateLink, #aboutLink{
  position: relative;
  margin-left: 15px;
  display: inline-block;
  font-size: 1rem;
  line-height: inherit;
  white-space: nowrap;
}
/** Spiner Custom */
.spinner-grow {
  position: absolute;
  left: -20px;
  top: 3px;
}
/** Navbar Design End */

/** List Design Start */
#contentSection{
  margin-top: 96px;
}
#jobTitle{
  font-size: 18px;
}
#jobTitle, #jobCompany, #jobType, #jobDeadline{
  text-transform: capitalize;
}
#card{
  margin: 14px 0;
}
#jobAuthor{
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0 5px;
}
#logTitle{
  margin-top: -8px;
  margin-bottom: 10px;
}
#newAccount{
  padding: 13px 0;
  cursor: pointer;
  font-weight: 600;
  color: #007bff;
  font-size: 14px;
}
/** List Design End */

/** App Media Only */
@media (min-width: 1200px){

  
}
@media screen and (max-width: 991px) {
  /** Navbar */
  #navbar #navbarRight{
    margin-right: 0;
  }
}
@media screen and (max-width: 767px) {
  /** Navbar */
  #navbar #navbarBrand{
    margin-left: 0;
  }
}
@media screen and (max-width: 479px) {

  
}
/** App Media End */

/** LOADER START */
/** Loader Custom */
.lds-ellipsis, .lds-ring{
  z-index: 1;
  position:absolute;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  top: 150px;
}

/** Loader Default */
.lds-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
#loaderText{
  position: relative; 
  top: 100px; 
  color: #6c757d;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 2px solid #6c757d;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #6c757d transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/** LOADER END */
</style>
