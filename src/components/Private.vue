<template>
  <div>
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <br><br><br>
    <div @mouseover="privateHover(true)" @mouseout="privateHover(false)" v-if="dataLoadSignal">
      <h1 style="background-color: red; padding: 10px; text-align: center; color: #fff;">Development Status : In Progress</h1>
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
      jobRetriveData: db.collection('jobs').orderBy('createdAt','asc')
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
