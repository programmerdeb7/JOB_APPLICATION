<template>
  <div id="app">
    <!-- Navbar Start -->
    <b-navbar id="navbar" fixed="top">
      <b-container>
        <b-navbar-brand href="#" id="navbarBrand" to="/">
          APPLIED 
          <vue-typed-js :strings="['<b>JOBS</b>']" :loop="true" :showCursor="false" id="navTypeJs">
            <span class="typing"></span>
          </vue-typed-js>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto" id="navbarRight">
          <b-nav-item to="govt" id="govtLink"><b-spinner type="grow" label="Spinning" v-if="spiner['govt']"></b-spinner>GOVT</b-nav-item>
          <b-nav-item to="private" id="privateLink"><b-spinner type="grow" label="Spinning" v-if="spiner['private']"></b-spinner>PRIVATE</b-nav-item>
        </b-navbar-nav>
      </b-container> 
    </b-navbar>
    <!-- Navbar End -->
    <router-view v-on:govt="govtHover" v-on:private="privateHover"/>
  </div>
</template>
<script>
import Vue from 'vue';
import VueTypedJs from 'vue-typed-js';
Vue.use(VueTypedJs);
export default {
  name: 'app',
  data: function(){
    return {
      spiner: {
        govt: false,
        private: false
      },
    }
  },
  methods: {
    /******************** TODO SECTION START */
    /******************** Need Optimisation */
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
    }
    /******************** TODO SECTION END */
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
