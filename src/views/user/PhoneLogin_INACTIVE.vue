<template>
  <div>
    <header>
      <backButton />
    </header>
    <div class="padding">

      <template v-if="!smsSent">
        <h2>Bitte gib deine Mobilnummer ein</h2>
        <input placeholder="0699123..." type="number" v-model="phoneNumber">
        <button v-if="phoneNumber.length > 10" id="phone-login" @click="submit(phoneNumber)">Sende SMS</button>
      </template>

      <phoneEnterCode v-else :confirmationResult="confirmationResult" />

      <div class="message">
        <p class="error" v-if="infoMessage">{{ infoMessage }}</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <div v-if="showRecaptcha" id="recaptcha-container"></div>

    </div>

  </div>
</template>
<script>
import backButton from '@/components/BackButton'
import phoneEnterCode from './PhoneEnterCode'

export default {
  data() {
    return {
      showRecaptcha: false,
      infoMessage: null,
      errorMessage: null,
      phoneNumber: '',
      smsSent: false,
      confirmationResult: null
    }
  },

  components: {
    backButton,
    phoneEnterCode
  },

  methods: {
    submit(phoneNumber) {
      const _this = this;
      this.showRecaptcha = true;
      this.$nextTick(() => {
        _this.getPhoneCode(phoneNumber);
      });
    },
    getPhoneCode(phoneNumber) {
      const _this = this;
      const phonePrefix = this.$variables.phonePrefix;
      const formatedNumber = phonePrefix + phoneNumber.substr(1);
   
      this.$firebase.auth().useDeviceLanguage();

      const appVerifier = new this.$firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
          console.log('response', response);
          _this.showRecaptcha = false;
          _this.$store.dispatch('updateIsLoading', true);
        },
        'expired-callback': function() {
          console.log('EXPIRED');
        }
      });
               
      this.$firebase.auth().signInWithPhoneNumber(formatedNumber, appVerifier)
      .then((confirmationResult) => {
        _this.confirmationResult = confirmationResult;
        _this.smsSent = true;

        console.log(confirmationResult);
        _this.infoMessage = 'Wir haben dir eine SMS mit deinem Code geschickt';

      }).catch((error) => {
        console.log(error);
        _this.errorMessage = error.message;

      }).finally(() => {
        _this.$store.dispatch('updateIsLoading', false);
      });
    }
  }  
}
</script>
<style lang="scss" scoped>
  #recaptcha-container {
    display: none;
  }

  .message {
    padding-top: 20px;
  }
</style>
