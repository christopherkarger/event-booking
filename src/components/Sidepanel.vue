<template>
  <div class="sidepanel">
    <slot></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .sidepanel {
    padding: 100px 20px 20px 20px;
    background: #fff;
    min-height: 100vh;
    width: 70vw;
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    z-index: 50;
    h3 {
      font-size: 20px
    }
  }
</style>