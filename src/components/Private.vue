<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <br><br><br><br>
    <div v-if="dataLoadSignal">
      <div v-for="item in jobRetriveData" :key="item" @mouseover="privateHover(true)" @mouseout="privateHover(false)">
        <b-container>
          <b-card v-if="item.company != 'govt'" id="card">
            <div id="jobTitle">{{ item.title }}</div>
            <div id="jobCompany">{{ item.company }}</div>
            <div id="jobDeadline">{{ item.deadline }} <span id="status">Expired</span></div>
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
      if(this.jobRetriveData.length > 1){
        this.loader = false;
        this.dataLoadSignal = true;
      }
    }
  }
}
</script>
<style scoped>

</style>
