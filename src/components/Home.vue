<template>
  <div>
    <!-- Loader -->
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>

    <div v-if="dataLoadSignal">
      <h1 style="background-color: red; padding: 10px; text-align: center; color: #fff;">Development Status : In Progress</h1>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase.js';
import Vue from 'vue';
import VueFlip from 'vue-flip';
import VueCircle from 'vue2-circle-progress';

export default {
  components: {
    'vue-flip': VueFlip,
    VueCircle
  },
  data() {
    return {
      jobRetriveData: [],
      loader: true,
      dataLoadSignal: false,
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('jobs').orderBy('createdAt','asc')
    }
  },
  computed: {
    formattedClubsSkills() {
        return this.skillData.reduce((c, n, i) => {
          if (i % 5 === 0) c.push([]);
          c[c.length - 1].push(n);
          return c;
        }, []);
    },
    formattedClubsPortfolio() {
        return this.portfolioData.reduce((c, n, i) => {
          if (i % 2 === 0) c.push([]);
          c[c.length - 1].push(n);
          return c;
        }, []);
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
