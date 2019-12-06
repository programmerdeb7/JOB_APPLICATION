<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <div v-if="dataLoadSignal" id="contentSection">
      <div v-for="item in jobRetriveData" :key="item">
        <b-container>
          <b-card v-if="item.privacy == 'public' || item.privacy == 'both'" id="card">
            <b-row>
              <b-col cols="8">
                <div id="jobTitle">{{ item.title }}</div>
              </b-col>
              <b-col cols="4" class="text-right">
                <div ><span id="jobAuthor">{{ item.user }}</span></div>
              </b-col>
            </b-row>
            <div id="jobCompany">{{ item.company }} - <span id="jobType">{{ item.type }}</span></div>
            <div id="jobDeadline">{{ item.deadline }}</div>
            <div id="jobLink"><a :href="item.link" target="_blank">Link</a></div>
          </b-card>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
export default {
  data() {
    return {
      jobRetriveData: [],
      loader: true,
      dataLoadSignal: false
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','desc')
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

</style>
