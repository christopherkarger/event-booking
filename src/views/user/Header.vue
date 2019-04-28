<template>
  <header v-if="loggedIn" :class="invert ? 'invert' : false">
    <div class="header__inner">
      <backButton />

      <toggleSidepanel :showSidepanel="showSidepanel" @toggleSidepanel="showSidepanel = !showSidepanel"/>
      
      <transition name="slide">
        <sidepanel v-if="showSidepanel">
          <h3 v-if="userName">{{ userName }}</h3>
          <logout></logout>
          
          <appButton v-if="$route.fullPath !== '/welcome'" @buttonClick="switchToView('back', '/welcome')">Home</appButton>  
          <appButton v-if="$route.fullPath !== '/events'" @buttonClick="$router.push('/events')">My appointments</appButton>
          <appButton v-if="$route.fullPath !== '/services'" @buttonClick="$router.push('/services')">New appointment</appButton>
          <appButton v-if="$route.fullPath !== '/about'" @buttonClick="$router.push('/about')">About us</appButton>

        </sidepanel>
      </transition>
      
      <blackout :showBlackout="showSidepanel" @clickedBlackout="showSidepanel = !showSidepanel"/>
    </div>
  </header>
</template>
<script>
import logout from '@/components/Logout';
import backButton from '@/components/BackButton';
import toggleSidepanel from '@/components/ToggleSidepanel';
import blackout from '@/components/Blackout';
import sidepanel from '@/components/Sidepanel';
import switchToView from '@/mixins/switchToView';
import appButton from '@/components/Button';

export default {
  data() {
    return {
      showSidepanel: false
    }
  },
  components: {
    logout,
    backButton,
    toggleSidepanel,
    blackout,
    appButton,
    sidepanel
  },
  computed: {
    invert() {
      const path = this.$route.fullPath;
      if (path === '/welcome' || path === '/') {
        return true;
      }
    },
    userName() {
      return this.$store.getters.userName;
    },
    isAdmin(){
      return this.$store.getters.isAdmin;
    },
    loggedIn(){
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    '$route' (to, from) {
      this.showSidepanel = false;
    }
  },
  mixins: [switchToView]
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  
  header {
    //position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 40;
  }
  .header__inner {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }
  
  .invert .toggle-sidepanel:not(.active){
    color: #fff;
  }

  .sidepanel {
    button {
      width: 100%;
    }

    button + button{
      margin-top: 10px;
    }
  }

 

</style>