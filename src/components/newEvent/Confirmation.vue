<template>
  <div>
    <h2>Thanks for your booking!</h2>
  </div>
</template>
<script>
  import resetEventProcess from '@/mixins/resetEventProcess';
  export default {
    mounted() {
      this.resetEventProcess();
    },
    mixins: [resetEventProcess]
  }
</script>
<style scoped lang="scss">

</style>