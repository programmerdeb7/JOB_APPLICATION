<template>
  <div>
    <!-- Loader -->
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>

    <br><br><br><br>
    <div v-if="dataLoadSignal">
      <div :key="item" @mouseover="govtHover(true)" @mouseout="govtHover(false)">
        <b-container>
          <b-card>
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group
                id="input-group-1"
                label="Job Title:"
                label-for="input-1"
                description=""
              >
                <b-form-input
                  id="input-1"
                  v-model="form.jobTitle"
                  type="text"
                  required
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Company Name:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.company"
                  required
                  placeholder="govt"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Deadline:" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.deadline"
                  required
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-4" label="Link:" label-for="input-4">
                <b-form-input
                  id="input-4"
                  v-model="form.link"
                  required
                  placeholder=""
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">ADD</b-button>
              <b-button type="reset" variant="danger">RESET</b-button>
            </b-form>
          </b-card>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import { db, data } from '../firebase.js';
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
      form: {
        jobTitle: '',
        company: '',
        deadline: '',
        link: ''
      }
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','asc')
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      data.add({
        title: this.form.jobTitle,
        company: this.form.company,
        deadline: this.form.deadline,
        link: this.form.link,
        createdAt: new Date()
      })
      .then(function(docRef){
        console.log("Document written with ID:" + docRef.id);
        alert(" Upload Success! ID : " + docRef.id);
      })
      .catch(function(error){
        console.error("Error adding document:" + error);
      });
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.jobTitle = ''
      this.form.company = 'govt'
      this.form.deadline = ''
      this.form.link = ''
    }
  },
  watch: {
    'jobRetriveData': function(){
      if(this.jobRetriveData.length > 1){
        this.loader = false;
        this.dataLoadSignal = true;
      }
      console.log("Found");
    }
  }
}
</script>
<style scoped>

</style>
