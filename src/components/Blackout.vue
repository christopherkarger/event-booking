<template>
  <transition name="fade">
    <div v-if="showBlackout" class="blackout" @click="close"></div>
  </transition> 
</template>
<script>
  export default {
    methods: {
      close() {
        this.$emit('clickedBlackout');
      }
    },
    props: ['showBlackout']
    
  }
</script>
<style lang="scss" scoped>
  .blackout {
    cursor: pointer;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 40;
  }
</style>