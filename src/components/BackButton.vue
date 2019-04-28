<template>
  <button class="icon" v-if="hasBackPath" @click="back"><span>Back</span></button>
</template>
<script>
  import parentPath from '@/jsModules/parent-path';
  export default {
    methods: {
      back() {
        const _this = this;
        const meta = this.$route.meta;
        this.$store.dispatch('updateTransitionName', 'back');
        let backPath;
        if (meta.skipBackPathTo) {
          // If user is on the overview page, and is admin or the name ist not set
          if ((this.$store.getters.isAdmin || !this.$store.getters.userName)) {
            backPath = parentPath(_this) + meta.backPath
          } else {
            backPath = parentPath(_this) + meta.skipBackPathTo;
          }
        } else {
          backPath = parentPath(_this) + meta.backPath;
        }

        this.$nextTick(() => { _this.$router.push(backPath); });     
      }
    },
    computed: {
      hasBackPath() {
        if (this.$route.meta && this.$route.meta.backPath) {
          return true;
        } else {
          return false;  
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  button {
    @extend %icon;
    color: $color2;
    padding: 0;
    border-radius: 0;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 22px;
    outline: 0;
    z-index: 10;
    span {
      display: none;
    }
    &:before {
      content: '\f060';
    }
  }
</style>