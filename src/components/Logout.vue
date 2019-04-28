<template>
  <appButton @buttonClick="logout">Logout</appButton>
</template>

<script>
  import firebase  from '@/jsModules/firebase';
  import appButton from '@/components/Button';

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      }
    },
    components: {
      appButton
    },
    methods: {
      afterLogout() {
        const isAdmin = this.$store.getters.isAdmin;
        this.$store.dispatch('setLoggedInStatus', false);
        this.$store.dispatch('setIsAdmin', false);
        isAdmin ? this.$router.push('/admin') : this.$router.push('/');
      },
      logout() {
        const _this = this;
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
          _this.afterLogout();
        }, function(error) {
          console.error('Sign Out Error', error);
        });
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  button  {
    width: 100%;
  }
</style>