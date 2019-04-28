<template>
  <button type="button" @click="click" :class="{danger}"><slot /></button>
</template>
<script>
  export default {
    methods: {
      click() {
        this.$emit('buttonClick');
      }
    },
    props: ['danger']
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/classes.scss';
  @import '@/styles/variables.scss';
  button {
    @extend %button;
    &.danger {
      background: $color8;
    }
  }
</style>