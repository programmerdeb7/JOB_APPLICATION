<template>
  <div id="app">
    <!-- Navbar Start -->
    <b-navbar id="navbar" fixed="top">
      <b-container>
        <b-navbar-brand href="#" id="navbarBrand" to="/">
          JOB <b>LAB</b>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto" id="navbarRight">
          <b-nav-item to="add" id="newLinkMd"><b-spinner type="grow" label="Spinning" v-if="spiner['add']"></b-spinner>NEW</b-nav-item>
          <b-nav-item to="add" id="newLink"><b-spinner type="grow" label="Spinning" v-if="spiner['add']"></b-spinner><b id="newLinkText">+</b></b-nav-item>
          <b-nav-item to="govt" id="govtLink"><b-spinner type="grow" label="Spinning" v-if="spiner['govt']"></b-spinner>GOVT</b-nav-item>
          <b-nav-item to="private" id="privateLink"><b-spinner type="grow" label="Spinning" v-if="spiner['private']"></b-spinner>PRIVATE</b-nav-item>
          <b-nav-item id="user" v-show="permission" @mouseover="changeUser()" @mouseout="changeUser()"><span v-show="showUser">{{ user }}</span><span v-show="!showUser" @click="logout()">LOG OUT</span></b-nav-item>
          <b-nav-item-dropdown right id="userMenu">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content id="user">
            </template>
            <b-dropdown-item id="userDropdown">{{ user }}</b-dropdown-item>
            <b-dropdown-item @click="logout()">LOG OUT</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container> 
    </b-navbar>
    <!-- Navbar End -->
    <!-- Log -->
    <div id="contentSection" v-show="!this.permission">
      <b-container>
        <b-row>
          <b-col offset-md="3" md="6" sm="12">
            <b-card>
              <div class="text-center" id="logTitle">LOG IN</div>
              <b-form>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="email" placeholder="EMAIL" type="email" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="pass" placeholder="PASSWORD" type="password" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-button type="submit" @click="signIn()" block variant="primary" id="loginbtn">LOG</b-button>
                <div id="remember">
                  <b-form-checkbox checked="true" disabled size="sm">REMEMBER</b-form-checkbox>
                </div>
              </b-form>
            </b-card>
            <div id="newAccount" class="text-center" @click="signup=true">CREATE NEW ACCOUNT</div>
            <b-card v-show="signup">
              <div class="text-center" id="logTitle">SIGN UP</div>
              <b-form>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="email" placeholder="EMAIL" type="email" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="username" placeholder="NICK NAME" type="text" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input v-model="password" placeholder="PASSWORD" type="password" required></b-input>
                  </b-input-group>
                </b-form-group>
                <b-button type="submit" @click="signUp()" block variant="success" id="signupbtn">SIGN UP</b-button>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- Log -->
    <router-view v-on:govt="govtHover" v-on:private="privateHover" v-on:add="addHover" v-show="this.permission" :email="email" :user="user"/>
    <br><br>
    <!-- Footer -->
    <b-navbar fixed="bottom" id="footer">
      <b-container>
        <b-navbar-brand href="#" id="footerBrand" to="/">HOST @DEB</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item id="footerLink" v-b-tooltip.hover title="deb.just.23@gmail.com">HOTLINK</b-nav-item>
        </b-navbar-nav>
      </b-container> 
    </b-navbar>
    <!-- Footer -->
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
      logData: [],
      spiner: {
        govt: false,
        private: false,
        add: false
      },
      email: this.getCookie('email'),
      user: '',
      pass: this.getCookie('pass'),
      username: '',
      password: '',
      permission: false,
      signup: false,
      showUser: true
    }
  },
  firestore(){
    return {
      logData: db.collection('logInfo')
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
      this.setCookie('email', this.email , 365);
      this.setCookie('pass', this.pass , 365);
      location.reload();
    },
    signUp: function(){
      logInfo.add({
        email: this.email,
        user: (this.username).toLowerCase(),
        pass: this.password
      })
      .then(function(docRef){
        alert("Account create success! You can log in now.");
      })
      .catch(function(error){
        alert("Faild!" + error);
      });
      this.signup= false;
    },
    changeUser: function(){
      if(this.showUser == true){
        this.showUser = false;
      }else{
        this.showUser = true;
      }
    },
    logout: function(){
      this.setCookie('email', '' , 365);
      this.setCookie('pass', '' , 365);
      location.reload();
    }
  },
  watch: {
    'logData': function(){
      if(this.logData.length > 0){
        for(var i = 0; i <= this.logData.length; i++){
          if(this.logData[i]['email'] == this.email){
            if(this.logData[i]['pass'] == this.pass){
              this.user = this.logData[i]['user']
              this.permission = true;
              // console.log(this.logData[i]['email']);
            }
          }else{
            console.log("Not Found!");
            // console.log(this.logData[i]['email']);
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
  background-color: #8A2BE2;
  border-bottom: 1px solid #d2d2d2;
}

#navbar #navbarBrand{
  text-transform: capitalize;
  font-size: 1rem;
  margin-left: 20px;
  color: #fff;
}
#navbarBrand #navTypeJs{
  display: inline-block;
}

#navbar #navbarRight{
  margin-right: 20px;
}
#navbarRight #govtLink, #privateLink, #newLink{
  position: relative;
  margin-left: 15px;
  display: inline-block;
  font-size: 1rem;
  line-height: inherit;
  white-space: nowrap;
}
#newLink{
  border: 1px solid #fff;
  border-radius: 50%;
  width: 31px;
  height: 31px;
  margin-top: 5px;
}
#newLinkText{
  margin-top: -5px;
  padding-left: 2px;
  position: absolute;
}
.navbar-light .navbar-nav .nav-link{
  color: #fff !important
}
#user{
  text-transform: uppercase;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-left: 20px;
}
#userDropdown{
  text-transform: uppercase;
}
/** Spiner Custom */
.spinner-grow {
  position: absolute;
  left: -20px;
  top: 3px;
}
/** Navbar Design End */

/** List Design Start */
#jobTitle{
  font-size: 18px;
}
#jobTitle, #jobCompany, #jobType, #jobDeadline{
  text-transform: capitalize;
}
#card{
  margin: 14px 0;
  background-color: #fff;
}
#card a{
  text-decoration: underline;
}
#jobType{
  padding: 0 5px;
  border-radius: 10px;
}
#jobAuthor{
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
#footerBrand{
  font-size: 14px;
  margin-left: 15px;
  color: #fff;
}
#footer{
  background-color: #444;
  height: 40px;
}
#footerLink a{
  color: #fff;
}
#remember{
  margin-top: 10px;
  font-size: 12px;
}
#loginbtn{
  background: linear-gradient(to right, #8A2BE2 -1%, springgreen 100%);
  border: 0;
}
#signupbtn{
  background: linear-gradient(to right, red -1%, springgreen 100%);
  border: 0;
}
/** List Design End */

/** App Media Only */
@media (min-width: 1200px){
  #navbar{
    padding: 20px 15px;
  }
  #contentSection{
    margin-top: 96px;
  }
  #userMenu{
    display: none;
  }
  #newLinkMd{
    display: block;
  }
  #newLink{
    display: none;
  }
}
@media screen and (max-width: 991px) {
  /** Navbar */
  #navbar #navbarRight{
    margin-right: 0;
  }
  #navbar{
    padding: 5px 15px;
  }
  #contentSection{
    margin-top: 66px;
  }
  #userMenu{
    display: none;
  }
  #newLinkMd{
    display: block;
  }
  #newLink{
    display: none;
  }
}
@media screen and (max-width: 767px) {
  /** Navbar */
  #navbar #navbarBrand{
    margin-left: 0;
  }
  #navbar{
    padding: 5px 15px;
  }
  #contentSection{
    margin-top: 66px;
  }
  #user{
    display: none;
  }
  #userMenu{
    display: block;
  }
  #newLinkMd{
    display: none;
  }
  #newLink{
    display: block;
  }
}
@media screen and (max-width: 479px) {
  #navbar{
    padding: 5px 15px;
  }
  #contentSection{
    margin-top: 66px;
  }
  #user{
    display: none;
  }
  #userMenu{
    display: block;
  }
  #newLinkMd{
    display: none;
  }
  #newLink{
    display: block;
  }
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
