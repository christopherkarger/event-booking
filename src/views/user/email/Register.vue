<template>
  <div>
    <form autocomplete="off" @submit.prevent="submit">
      <h3>E-Mail</h3>
      <input type="email" placeholder="test@gmail.com" autocomplete="email" v-model="email" :class="{'error': hasError(0, email) }">
      <h3>Password</h3>
      <input type="password" placeholder="password" autocomplete="new-password" v-model="password" :class="{'error': hasError(0, password) }">

      <h3>Repeat password</h3>
      <input type="password" placeholder="Repeat password" v-model="passwordRetype" :class="{'error': hasError(0, passwordRetype) }">

      <p class="error" v-if="error">{{ error }}</p>
      <appButton type="submit">Register</appButton>

    </form>
  </div>
</template>
<script>

import validateInputs from '@/mixins/validateInputs';
import appButton from '@/components/Button';

export default {
  data() {
    return {
      error: null,
      email: '',
      password: '',
      passwordRetype: ''
    }
  },
  components: {
    appButton
  },
  methods: {
 
    submit() {
      const _this = this;
      const hasError = this.validateInputs([ this.email, this.password, this.passwordRetype]);
      
      if (hasError) {
        this.error = 'Bitte fülle alle Felder aus';
      } else if (this.password !== this.passwordRetype) {
        this.error = 'Passwörter stimmen nicht überein';
      } else if (this.password.length < 6) {
        this.error = 'Passwort muss mindestens 6-stellig sein';
      } else { 
        console.log('submit');
        this.$store.dispatch('updateIsLoading', true);

        this.error = null;
        const email = this.email;
        const password = this.password;

        this.$firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.  
          var errorCode = error.code;
          var errorMessage = error.message;
          
          console.log(error);

          if (errorCode === 'auth/invalid-email') {
            _this.error = 'Die eingegebene E-Mail-Adresse ist ungültig';
          }

          if (errorCode === 'auth/email-already-in-use') {
            _this.error = 'E-Mail-Adresse ist schon vergeben';
          }
          
        })
        .finally(() => {
          _this.$store.dispatch('updateIsLoading', false);
        });
      }
    }
  },
 mixins: [validateInputs]
}
</script>

<style>

</style>
