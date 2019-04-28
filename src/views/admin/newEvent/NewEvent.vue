<template>
  <modal :clickedBlackout="back">
    <backButton />
    <xButton @xbuttonClick="back"><span>Close</span></xButton>
    <router-view />
  </modal>
</template>
<script>
  import backButton from '@/components/BackButton';
  import modal from '@/components/Modal';
  import xButton from '@/components/XButton';

  export default {
    data() {
      return {
      }
    },
    methods: {
      back() {
        this.$router.push('/admin/events');
      }
    },
    components: {
      backButton,
      modal,
      xButton
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .overlay  /deep/ {
    .next-view {
      position: absolute;
      height: 70px;
      border-top: 1px solid $color5;
      button {
        position: absolute;
        left: auto;
        right: 10px;
        width: auto;
      }
    }
    .block {
      border: 0;
      position: static;
      padding: 0;
      background: none;
    }

    .loading {
      position: absolute;
      top: 50px;
      height: auto;
      padding: 0;
    }
    .overlay__inner {
      padding: 50px 20px 0 20px;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background:$color5;
        position: absolute;
        left: 0;
        top: 50px;
      }
      & > div {
        overflow: auto;
        height: 67vh;
        max-height: 500px;
        padding-top: 20px;
        padding-bottom: 80px;
      }
    }
  }
</style>