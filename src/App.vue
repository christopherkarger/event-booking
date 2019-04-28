<template>
  <div id="app" :class="{ 
    'user-app': !adminSpace, 
    'admin' : adminSpace, 
    'logged-in': isLoggedIn, 
    'login' : !isLoggedIn, 
    'modal-visible' : modalVisible 
  }">

    <loading v-if="!adminSpace"/>

    <pageHeader v-if="!isAdmin"/>

    <main class="main-view">
      <transition :name="transitionName" :mode="transitionMode" 
        v-on:after-enter="routeChanged"  
        v-on:after-leave="routeChanged">
      <router-view/>
      </transition>
    </main>
  </div>
</template>


<script>
  import loading from '@/components/Loading.vue'
  import pageHeader from '@/views/user/Header.vue'

  export default {
    data() {
      return {
        initPath: location.pathname
      }
    },
    components: {
      loading,
      pageHeader
    },
    computed: {
      modalVisible() {
        return this.$store.getters.modalVisible;
      },
      adminSpace() {
        const fullPath = this.$route.fullPath;
        return location.pathname.indexOf('/admin') > -1 || fullPath.indexOf('/admin') > -1;
      },
      isAdmin(){
        return this.$store.getters.isAdmin;
      },
      isLoggedIn(){
        return this.$store.getters.isLoggedIn;
      },
      transitionName() {
        return this.$store.getters.transitionName;
      },
      transitionMode() {
        return this.$store.getters.transitionMode;
      }
    },
    methods: {
      routeChanged(el) {
        this.$store.dispatch('updateTransitionName', 'no');
        this.$store.dispatch('updateTransitionMode', '');
      },
      checkIfAdmin(provider, firebaseUser) {
        console.log('check if admin');
        const _this = this;
  
        this.$firebase.database().ref('isAdmin').once('value', () => {
          console.log('user is admin');
          // User is admin
          _this.$store.dispatch('setIsAdmin', true);

        }).then(() => {      
          _this.afterLogin(provider, firebaseUser);
        }).catch(() => {
          console.log('user is not an admin');
          if (this.$router.currentRoute.fullPath.indexOf('/admin') > -1) {
            _this.$firebase.auth().signOut().then(function() {
              console.log('fake admin user signed out')
            });
          } else {
            _this.afterLogin(provider, firebaseUser);
          }
        });
      },

      afterLogin(loginService,user) {
        this.$store.dispatch('setLoggedInStatus', true);
        this.$store.dispatch('setLoginService', loginService);
        this.$store.dispatch('setUserName', user.displayName);
        this.$store.dispatch('setUserEmail', user.email);
        this.$store.dispatch('setUserId', user.uid);
        const isAdmin = this.$store.getters.isAdmin;

        if (!isAdmin) {
          this.saveFirstTimeLogin(user);
        }
        
        if (isAdmin) {
          this.$router.push('/admin/home');
        } else {
          this.$router.push('/welcome');
        }

        this.$store.dispatch('updateIsLoading', false); 
        
      },

      saveFirstTimeLogin(user) {
        const thisUser = this.$firebase.database().ref('users/' + user.uid);
        const loginService = this.$store.getters.loginService;

        thisUser.once('value', (snapshot) => {
          let userExists = snapshot.val();
          //let children = snapshot.numChildren();
          if (!userExists) {
            console.log('save User for the first time');
            thisUser.set({
              provider: loginService,
              username: user.displayName,
              email: user.email,
              time: new Date().getTime()
            });

          }        
        });
      }
    },

    mounted() {
      const _this = this;
    
      this.$store.dispatch('updateIsLoading', true);

      this.$firebase.auth().onAuthStateChanged((firebaseUser) => {
        let provider = false;
        if (firebaseUser) {
          // User is signed in.
          if (firebaseUser.providerData[0].providerId.indexOf('google') > -1) {
            provider = 'google';
          }

          if (firebaseUser.providerData[0].providerId.indexOf('facebook') > -1) {
            provider = 'facebook';
          }
          
          if (provider) {
             _this.afterLogin(provider, firebaseUser);
          } else {
            _this.checkIfAdmin(provider, firebaseUser);
          }
          
        } else {
          // No user is signed in.
          console.log('no user is logged in');
          _this.$store.dispatch('updateIsLoading', false); 
        }

        
      });
    }
  }
</script>

<style lang="scss">
  @import '@/styles/main.scss';
</style>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  #app {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    background: $color3;
    &.user-app {
      display: flex;
      flex-direction: column;
      max-width: 600px;
    }
    &.modal-visible {
      height: 100vh !important;
      overflow: hidden !important;
    }
  }

  .main-view {
    position: relative;
    z-index: 30;
    display: flex;
    flex: 1 1 auto;
    align-content: stretch;
    &:after {
      content: '';
      display: block;
      //position: absolute;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      z-index: 1;
      background: #fff;
      transition: all .4s ease;
    }
    
    & > * {
      position: relative;
      padding-top: 80px;
      flex: 1 1 auto;
      width: 100%;
    }
  }

  .admin  {
    .main-view {
      z-index: inherit;
      padding: 0;

      & > * {
        padding: 0;
      }
      &:after {
        display: none;
      }
    }

    &.login {
      display: flex;
      align-items: center;
      justify-content: center;

      .main-view {
        flex: 0 0 auto;
        max-width: 400px;
        width: 100%;
        padding: 20px;
      }
    }

    &.logged-in .main-view {
      @media screen and (min-width: 768px) {
        margin-left: 50px;
      }    
    } 
  }
</style>