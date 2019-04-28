<template>
  <div class="loading" v-if="loading">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
</template>
<script>
 export default {
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    }
  }
 }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  .loading {
    display: flex;
    justify-content: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background:rgba(255,255,255,.8);
    z-index: 50;
    .admin & {
      z-index: 30;
    }
  }

  .lds-ring {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid $color1;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $color1 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>