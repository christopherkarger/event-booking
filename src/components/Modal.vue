<template>
  <div class="overlay">
    <div class="overlay__inner">
      <loading />
      <slot></slot>
    </div>
    <blackout :showBlackout="true" @clickedBlackout="clickedBlackout"/>
</div>
</template>

<script>
  import blackout from '@/components/Blackout';
  import loading from '@/components/Loading';
  export default {
    props: ['clickedBlackout'],
    components: {
      blackout,
      loading
    },
    mounted() {
      this.$store.dispatch('updateModalVisible', true);
    },
    destroyed() {
      this.$store.dispatch('updateModalVisible', false);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;  
    display: flex;
    justify-content: center; 
    align-items: center;
    z-index: 100;
  }

  .overlay__inner {
    background: #fff;
    position: relative;
    width: 80%;
    max-width: 600px;
    z-index: 50;
    padding: 30px;
  
  }
</style>