<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <div v-if="dataLoadSignal" id="contentSection" @mouseover="privateHover(true)" @mouseout="privateHover(false)">
      <b-container>
        <b-row>
          <b-col offset-md="1" md="10" lg="10" sm="12">
            <b-card class="text-center title-card">
              YOUT PERSONAL PRIVATE JOB APPLICATION LIST
            </b-card>
            <div v-for="item in jobRetriveData" :key="item">
              <b-card v-if="item.type == 'private' && (item.privacy == 'onlyme' || item.privacy == 'both') && item.email == userInfo" id="card">
                <div id="jobTitle" title="Job Title">{{ item.title }}</div>
                <div id="jobCompany" title="Company Name">{{ item.company }} - <span id="jobType">{{ item.type }}</span></div>
                <div id="jobDeadline" title="Application Deadline">{{ item.deadline }}</div>
                <div id="jobLink" title="Source Link"><a :href="item.link" target="_blank">Source Link</a></div>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
export default {
  props:['email'],
  data() {
    return {
      jobRetriveData: [],
      loader: true,
      dataLoadSignal: false,
      userInfo: this.email
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','desc')
    }
  },
  methods: {
    privateHover: function(value){
      if(value == true){
        this.$emit('private', true);
      }
      if(value == false){
        this.$emit('private', false);
      }
    }
  },
  watch: {
    'jobRetriveData': function(){
      if(this.jobRetriveData.length > 0){
        this.loader = false;
        this.dataLoadSignal = true;
      }
    }
  }
}
</script>
<style scoped>
#card{
  color: #008080;
  border: 1px solid #008080;
}
#card a{
  color: #008080;
}
.title-card{
  background: linear-gradient(to right, #FF4040 -1%, #008080 100%);
  color: #fff;
  border: 0;
}
#jobType{
  background-color: #008080;
  color: #fff;
  border-color: #008080;
}
</style>
