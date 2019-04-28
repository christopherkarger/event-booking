<template>
  <div class="next-view">
    <appButton @buttonClick="$emit('next')">
      <template v-if="text">{{ text }}</template>
      <template v-else>Next</template>
    </appButton>
  </div>
</template>
<script>
import appButton from '@/components/Button';

export default {
  components: {
    appButton
  },
  props: ['text']
}
</script>
<style lang="scss" scoped>
  .next-view {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    transition: opacity .2s ease;
    button {
      width: 80%;
      left: 10%;
    }
  }

  .forth-enter-active,
  .forth-leave-active,
  .back-enter-active,
  .back-leave-active {
    .next-view {
      opacity: 0;
      pointer-events: none;
    } 
  }
</style>