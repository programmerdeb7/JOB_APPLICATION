<template>
  <div>
    <!-- Loader -->
    <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
    <div v-if="dataLoadSignal" id="contentSection" @mouseover="addHover(true)" @mouseout="addHover(false)">
      <b-container>
        <b-card class="text-center">
          COLLECT YOUR JOB INFORMATION OR SHARE IT
        </b-card>
        <b-card id="card">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="input-group-1"
              label="JOB TITLE:"
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

            <b-form-group id="input-group-2" label="COMPANY NAME:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.company"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="DEADLINE:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.deadline"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="LINK:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="form.link"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>

            <b-form-group label="JOB TYPE">
              <b-form-radio-group required>
                <b-form-radio v-model="form.jobType" name="some-radios" value="govt">GOVT</b-form-radio>
                <b-form-radio v-model="form.jobType" name="some-radios" value="private">PRIVATE</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group label="PRIVACY">
              <b-form-radio-group required>
                <b-form-radio v-model="form.collectionType" name="some-radios" value="public">PUBLIC</b-form-radio>
                <b-form-radio v-model="form.collectionType" name="some-radios" value="onlyme">ONLY ME</b-form-radio>
                <b-form-radio v-model="form.collectionType" name="some-radios" value="both">BOTH</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-row>
              <b-col cols="6">
                <b-button type="submit" variant="primary">UPLOAD</b-button>
              </b-col>
              <b-col cols="6" class="text-right">
                <b-button type="reset" variant="danger">RESET</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-container>
    </div>
  </div>
</template>
<script>
import { db, data } from '../firebase.js';
import Vue from 'vue';
import VueFlip from 'vue-flip';
import VueCircle from 'vue2-circle-progress';

export default {
  props:['user'],
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
        link: '',
        jobType: '',
        collectionType: '',
        user: this.user
      }
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('applied_jobs').orderBy('createdAt','desc')
    }
  },
  computed: {

  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      data.add({
        title: this.form.jobTitle,
        company: this.form.company,
        deadline: this.form.deadline,
        link: this.form.link,
        type: this.form.jobType,
        privacy: this.form.collectionType,
        createdAt: new Date(),
        user: this.user
      })
      .then(function(docRef){
        console.log("Document written with ID:" + docRef.id);
        alert(" Upload Success! ID : " + docRef.id);
      })
      .catch(function(error){
        console.error("Error adding document:" + error);
        alert(" Upload Faild! - " + error);
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.jobTitle = '',
      this.form.company = '',
      this.form.deadline = '',
      this.form.link = '',
      this.form.jobType = '',
      this.form.collectionType = ''
    },
    addHover: function(value){
      if(value == true){
        this.$emit('add', true);
      }
      if(value == false){
        this.$emit('add', false);
      }
    }
  },
  watch: {
    'jobRetriveData': function(){
      this.loader = false;
      this.dataLoadSignal = true;
    }
  }
}
</script>
<style scoped>

</style>
