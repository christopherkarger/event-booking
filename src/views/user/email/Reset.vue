<template>
  <div>
    <form autocomplete="off" @submit.prevent="submit">
      <h3>E-Mail</h3>
      <input type="email" placeholder="test@gmail.com" autocomplete="email" v-model="email" :class="{'error': hasError(0, email) }">
      <p class="error" v-if="error">{{ error }}</p>
      <p  v-if="msg">{{ msg }}</p>
      <appButton type="submit">Reset password</appButton>
    </form>
  </div>
</template>
<script>
  import validateInputs from '@/mixins/validateInputs';
  import appButton from '@/components/Button';
  export default {
    data() {
      return {
        msg: null,
        error: null,
        email: ''
      }
    },
    components: {
      appButton
    },
    methods: {
      submit() {
        const _this = this;
        const hasError = this.validateInputs([this.email]);
      
        if (hasError) {
          this.error = 'Bitte fülle alle Felder aus';
        } else {
          this.$store.dispatch('updateIsLoading', true);
          this.$firebase.auth().sendPasswordResetEmail(_this.email).then(() => {
            _this.msg = 'Wir haben dir eine E-mail geschickt, mit dem du das Passwort zurücksetzen kannst.';
          }).catch(function(error) {
            console.log(error);
          }).finally(() => {
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