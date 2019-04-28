<template>
  <div class="padding">
    <confirmation />
    <appButton @buttonClick="$router.push('/services')">New appointment</appButton>
  </div>  
</template>

<script>
import confirmation from '@/components/newEvent/Confirmation';
import appButton from '@/components/Button';
export default {
  components: {
    confirmation,
    appButton
  }
}
</script>

<style>
</style>
