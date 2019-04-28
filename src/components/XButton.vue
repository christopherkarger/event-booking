<template>
  <button class="x-button" @click="click"><span>remove</span></button>
</template>
<script>
  export default {
    methods: {
      click() {
        this.$emit('xbuttonClick')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  button {
    @extend %icon;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 22px;
    color: $color2;
    &:before {
      content: '\f00d';
    }
    .no-touch-events &:hover{
      color: $color1;
    }
  }
</style>