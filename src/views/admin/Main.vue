<template>
<div>
  
  <pageHeader v-if="isLoggedIn"/>

  <div class="logo" v-if="!isLoggedIn"></div>

  <div class="login-form center" v-if="!isLoggedIn">
    <form id="login" autocomplete="off" @submit.prevent="login"> 
      <input type="text" placeholder="E-mail" v-model="email"/>
      <input type="password" placeholder="Password" v-model="password"/>
      <appButton type="submit" :disabled="email.length === 0 || password.length === 0">Login</appButton>
      <appButton @buttonClick="$router.push('/')">Home</appButton>
    </form>
  </div>
  
  <loading v-if="!modalVisible"/>
  
  <div class="admin-main-view" v-if="isLoggedIn">
    <router-view/>
  </div>
  
</div>
</template>
<script>
import pageHeader from './Header.vue';
import loading from '@/components/Loading.vue';
import appButton from '@/components/Button';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    modalVisible() {
      return this.$store.getters.modalVisible;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  components: {
    loading,
    pageHeader,
    appButton
  },
  methods: {
    adminLogin() {
      this.$store.dispatch('updateIsLoading', true);
      this.$firebase.auth().signInWithEmailAndPassword('muh@muh.at', 'test12');
    },
    login() {
      const _this = this;
      this.$store.dispatch('updateIsLoading', true);
      const email = this.email;
      const password = this.password;
      this.$firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log(user);
        console.log('signed in with email and password');
        // _this.$store.dispatch('setLoggedInStatus', true);
        // _this.$router.push('/admin/overview');
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        _this.$store.dispatch('updateIsLoading', false);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  
  .admin-main-view {
    position: relative;
    padding: 50px 20px 80px 20px;
    @media screen and (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .login .logo {
    display: block;
    position: relative;
    right: auto;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 40px;
    width: 200px;
    height: 205px;
    background: url(../../assets/logo.svg) 0 0 no-repeat;
    background-size: 100% auto;
    z-index: inherit;
  }

  
  .login-form {
    background: #fff;
    padding: 25px;
    border-radius: 5px;
    input {
      background: $color3;
      &:-webkit-autofill {
        box-shadow: 0 0 0 100px $color3 inset;
      }
    }

    button {
      width: 100%;
    }

    button + button{
      margin-top: 20px;
    }
    
  }

</style>