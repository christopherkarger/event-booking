<template>
  <div class="padding">
   <h2>Your appointment</h2>
    <overview />
  </div>
</template>
<script>
import store from '@/store';
import router from '@/router';
import overview from '@/components/newEvent/Overview';

export default {
  components: {
    overview
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.selectedDate.index !== undefined) {
      next();
    } else {
      console.log('go back');
      router.go(-1);
    } 
  }
}
</script>
<style>

</style>
