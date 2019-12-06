<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <div v-if="dataLoadSignal" id="contentSection" @mouseover="govtHover(true)" @mouseout="govtHover(false)">
      <b-container>
        <b-card class="text-center">
          YOUT PERSONAL GOVT JOB APPLICATION LIST
        </b-card>
        <div v-for="item in jobRetriveData" :key="item">
          <b-card v-if="item.type == 'govt' && (item.privacy == 'onlyme' || item.privacy == 'both') && item.user == userInfo" id="card">
            <div id="jobTitle" title="Job Title">{{ item.title }}</div>
            <div id="jobCompany" title="Company Name">{{ item.company }} - <span id="jobType">{{ item.type }}</span></div>
            <div id="jobDeadline" title="Application Deadline">{{ item.deadline }}</div>
            <div id="jobLink" title="Source Link"><a :href="item.link" target="_blank">Source Link</a></div>
          </b-card>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
export default {
  props:['user'],
  data() {
    return {
      jobRetriveData: [],
      loader: true,
      dataLoadSignal: false,
      userInfo: this.user
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','desc')
    }
  },
  methods: {
    govtHover: function(value){
      if(value == true){
        this.$emit('govt', true);
      }
      if(value == false){
        this.$emit('govt', false);
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

</style>
