<template>
  <header :class=" { 'primary-active' : showPrimary }">
    <div class="logo"></div>

    <nav class="primary" :class="{ 'active' : showPrimary }">
      <ul>
        <li><router-link to="/admin/home" tag="a">Home</router-link></li>
        <li><router-link to="/admin/shop" tag="a">Shop</router-link></li>
        <li><router-link to="/admin/employees" tag="a">Employees</router-link></li>
        <li><router-link to="/admin/services" tag="a">Services</router-link></li>
        <li><router-link to="/admin/events" tag="a">Events</router-link></li>
        <li><router-link to="/admin/holiday" tag="a">Holiday</router-link></li>
      </ul>
    </nav>
   
    <div class="mainbar">
  
      <toggleSidepanel :showSidepanel="showSidepanel" @toggleSidepanel="showSidepanel = !showSidepanel"/>

      <button class="toggle-primary" :class="showPrimary ? 'active' : false" @click="showPrimary = !showPrimary">
        <span>Show primary</span>
      </button>
    
      <transition name="slide">
        <sidepanel v-if="showSidepanel">
          <h3>{{ $variables.clientName }}</h3>
          <logout></logout>        
        </sidepanel>
      </transition>

      <blackout :showBlackout="showSidepanel" @clickedBlackout="showSidepanel = !showSidepanel"/>
    </div>

  </header>
</template>
<script>
import logout from '@/components/Logout';
import toggleSidepanel from '@/components/ToggleSidepanel';
import blackout from '@/components/Blackout';
import sidepanel from '@/components/Sidepanel';

export default {
  data() {
    return {
      showSidepanel: false,
      showPrimary: false
    }
  },
  computed: {
    loggedIn(){
      return this.$store.getters.isLoggedIn;
    }
  },
  components: {
    logout,
    toggleSidepanel,
    blackout,
    sidepanel  
  },
  methods: {
  },
  watch: {
    '$route' (to, from) {
      this.showSidepanel = false;
      this.showPrimary = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 60;
    .toggle-sidepanel:not(.active) {
      color: #fff;
    }
  }
  
  .logo {
    display: block;
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 40px;
    margin: 0;
    z-index: 45;
    background: url(../../assets/logo-min-white.svg) 0 0 no-repeat;
    background-size: 100% auto;

    @media screen and (min-width: 768px) {
      left: auto;
      transform: none;
      top: 35px;
      right: 25px;
      width: 160px;
      height: 60px;
      background-image: url(../../assets/logo-min.svg);
    }
  }

  .mainbar {
    background: $color2;
    width: auto;
    height: 50px;
  }

  .toggle-primary {
    @extend %icon;
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
    font-size: 21px;
    z-index: 30;
    color: #fff;
    span {
      display: none;
    }
  }

  .toggle-primary {
    left: 0;
    &:before {
      content: '\f0c9';
    }
    &.active:before {
      content: '\f00d';
    }
  } 

   .primary {
    a {
      &.router-link-exact-active {
        pointer-events: none;
        cursor: default;
      }
    }
   }

  @media screen and(max-width: 767px) {
    .primary {
      display: flex;
      opacity: 0;
      pointer-events: none;
      background: $color1;
      position: fixed;
      top: 50px;
      left: 0;
      bottom: 0;
      right: 0;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all .3s ease;
      
      ul {
        transform: scale(1.2);
        transition: all .3s ease;
      }

      &.active {
        opacity: 1;
        pointer-events: auto;
        ul {
          transform: scale(1);
        }    
      }
      
      li + li {
        margin-top: 20px;
      }

      a {
        position: relative;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        &.router-link-exact-active:after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: #fff;
          position: absolute;
          bottom: -6px;
          left: 0;
          opacity: .4;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    header {
      position: relative;
      top: auto;
      left: auto;
      background: #fff;
      height: 120px;
      //z-index: 40;
    }

    .mainbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 50px;
      height: auto;
      min-height: 100vh;
      color: #fff;
    }

    .toggle-primary {
      display: none;
    }
    
    nav {
      height: 100%;
      display: flex;
      align-items: flex-end;
      ul {
        display: flex;
        margin-left: 40px;
        li {
          margin-right: 20px; 
        }
      }
      a {
        position: relative;
        display: block;
        text-decoration: none;
        color: $color6;
        font-size: 16px;
        padding-bottom: 20px;
        &.router-link-active {
          color: $color2;
          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 3px;
            background: $color1;
            position: absolute;
            bottom: 0px;
          }
        }
        .no-touch-events &:hover {
          color: $color1;
        }
      }
    }

    .sidepanel {
      right: auto;
      left: 0;
      width: 250px;
      &.slide-enter, 
      &.slide-leave-to {
        transform: translateX(-100vw);
      }
    }

   

  }

</style>