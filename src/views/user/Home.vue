<template>
  <div class="home center store-bg padding">
    <img class="logo" src="../../assets/logo-white.svg" />
    <h2>Please login</h2>

    <appButton @buttonClick="login('google')" class="outline">Login with google</appButton>
    <appButton @buttonClick="login('facebook')" class="outline">Login with facebook</appButton>
    <appButton @buttonClick="switchToView('forth', '/email')" class="outline">Login with email</appButton>    

  </div>
</template>

<script>
import switchToView from '@/mixins/switchToView';
import appButton from '@/components/Button';

export default {
  name: 'home',
  data() {
    return {
      uid: null
    }
  },
  components: {
    appButton
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    }
  },
  methods: { 
    login(loginService) {
      let provider;
      this.$store.dispatch('updateIsLoading', true);

      if (loginService === 'google' || loginService === 'facebook') {
        if (loginService === 'google') {
          provider = new this.$firebase.auth.GoogleAuthProvider();
        }

        if (loginService === 'facebook') {
          provider = new this.$firebase.auth.FacebookAuthProvider();
        }
        
        this.$firebase.auth().signInWithRedirect(provider);
      }
      
    }
  },
  mixins: [switchToView]
}
</script>

<style lang="scss" scoped>
  @import '@/styles/classes.scss';
  .logo {
    display: block;
    width: 160px;
    height: auto;
    margin-bottom: 50px;
    background-size: 100% auto; 
  }
  .home {
    padding-top: 70px;
  }
  .store-bg {
    @extend %store-bg;
    &:after {
      background-image: url('../../#{$storeImage}');
    }
  }

  button {
    width: 100%;
  }

  button + button{
    margin-top: 20px;
  }
</style>