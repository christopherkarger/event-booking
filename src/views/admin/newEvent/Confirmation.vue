<template>
  <div>
   <confirmation />
   <appButton @buttonClick="$router.push('/admin/events/new-event/services')">New booking</appButton>
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
<style scoped lang="scss">

</style>