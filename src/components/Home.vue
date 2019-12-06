<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <div v-if="dataLoadSignal" id="contentSection">
      <b-container>
        <b-row>
          <b-col md="8" sm="12">
            <b-card class="text-center">
              ALL PUBLIC JOB INFORMATION
            </b-card>
            <div v-for="item in jobRetriveData" :key="item">
              <b-card v-if="item.privacy == 'public' || item.privacy == 'both'" id="card">
                <b-row>
                  <b-col cols="8">
                    <div id="jobTitle" title="Job Title">{{ item.title }}</div>
                  </b-col>
                  <b-col cols="4">
                    <div class="text-right" title="Posted By"><span id="jobAuthor">{{ item.user }}</span></div>
                  </b-col>
                </b-row>
                <div id="jobCompany" title="Company Name">{{ item.company }} - <span id="jobType">{{ item.type }}</span></div>
                <div id="jobDeadline" title="Application Deadline">{{ item.deadline }}</div>
                <div id="jobLink" title="Source Link"><a :href="item.link" target="_blank">Source Link</a></div>
              </b-card>
            </div>
          </b-col>
          <b-col cols="4">
            <b-card class="text-center">
              USER LIST
            </b-card>
            <div>
              <b-card id="card">
                <div id="userlist" v-for="item in logData" :key="item"><span id="userlistData">{{ item.user }} <span v-if="item.user == user">(YOU)</span></span></div>
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
  props:['user'],
  data() {
    return {
      jobRetriveData: [],
      logData: [],
      loader: true,
      dataLoadSignal: false
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','desc'),
      logData: db.collection('logInfo')
    }
  },
  methods: {
    
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
#userlist{
  margin-bottom: 5px;
}
#userlistData{
  text-transform: lowercase;
  border: 1px solid gray;
  padding: 0 5px;
  border-radius: 10px;
}
</style>
