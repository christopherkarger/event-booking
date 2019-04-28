<template>
  <div class="center">
    <h1>Welcome<span>{{ $variables.clientName }}</span></h1>
    <div class="welcome-logo">
      <img src="../../assets/logo.svg" />
    </div>
  </div>
</template>
<script>
  
  export default {
    data() {
      return {
        
      }
    },
    computed: {
      isShopHomepage() {
        return this.$route.name === 'shopHome';
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  h1 {
    text-align: center;
    font-size: 30px;
    line-height: 1.1;
    padding-top: 20px;
    margin-bottom: 50px;
    @media screen and (min-width: 768px) {
      font-size: 45px;
    }

    span {
      display: block;
    }  
  }
  
  .welcome-logo {
    width: 220px;
    @media screen and (min-width: 768px) {
      width: 282px;
    }
  }
</style>