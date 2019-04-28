<template>
  <div>
    <form autocomplete="off" @submit.prevent="submit">
      <h3>E-Mail</h3>
      <input type="email" placeholder="test@gmail.com" autocomplete="email" v-model="email" :class="{'error': hasError(0, email) }">
      <h3>Password</h3>
      <input type="password" placeholder="password" autocomplete="password" v-model="password" :class="{'error': hasError(1, password) }">
      <p class="error" v-if="error">{{ error }}</p>
      <appButton type="submit">Login</appButton>
    </form>
  
    <router-link to="/email/register" class="add-reg">
      No account, register here!
    </router-link>

    <router-link to="/email/reset" class="add-reg">
      Forgot your password?
    </router-link>
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
      password: ''
    }
  },
  components: {
    appButton
  },
  methods: {
    submit() {
      const _this = this;
      const hasError = this.validateInputs([_this.email, _this.password]);

      if (hasError) {
        _this.error = 'Bitte alle Felder ausfüllen';
      } else {
        this.$store.dispatch('updateIsLoading', true);
        const email = this.email;
        const password = this.password;
        
        this.$firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            _this.error = 'Falsches Passwort';
          } else if(errorCode === 'auth/user-not-found') {
            _this.error = 'Deine Email-Adresse ist uns nicht bekannt';
          } else {
            console.log(error);
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

<style lang="scss" scoped>
@import '@/styles/variables.scss';
  .add-reg {
    background: none;
    border: 0;
    display: block;
    text-align: left;
    margin-top: 20px;
  }
</style>
