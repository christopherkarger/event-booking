<template>
  <div class="padding">
    <h2>Pick a day</h2>
    <date />
  </div>
</template>

<script>
import store from '@/store';
import router from '@/router';
import date from '@/components/newEvent/Date';

export default {
  components: {
    date
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.selectedEmployee.index !== undefined) {
      next();
    } else {
      console.log('go back');
      router.go(-1);
    } 
  }
}
</script>

<style scoped lang="scss">
</style>