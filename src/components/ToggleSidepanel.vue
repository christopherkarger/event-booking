<template>
  <button :class="{'toggle-sidepanel': true, 'active': active}" @click="toggle">
    <span>Show sidepanel</span>
  </button>
</template>
<script>
  export default {
    data() {
      return {
        active: false
      }
    },

    methods: {
      toggle() {
        this.$emit('toggleSidepanel');
        this.active = !this.active;
      }
    },
    props: ['showSidepanel'],
    watch: {
      showSidepanel() {
        this.active = this.showSidepanel;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
 
  button {
    @extend %icon;
    display: block;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 21px;
    z-index: 60;
    .invert & {
      color: #fff;
    }
    &:before {
      content: '\f007';
    }

    &.active {
      color: $color2;
      &:before {
        content: '\f00d';
      }
    }
  }
</style>