<template>
  <div class="padding">
    <h2>Choose an employee</h2>
    <employees />
  </div>
</template>

<script>
import store from '@/store';
import router from '@/router';
import employees from '@/components/newEvent/Employees';

export default {
  components: {
    employees
  },
  beforeRouteEnter (to, from, next) {
    if (store.getters.selectedService.index !== undefined) {
      next();
    } else {
      router.go(-1);
    } 
  }
}
</script>

<style lang="scss" scoped>

</style>
