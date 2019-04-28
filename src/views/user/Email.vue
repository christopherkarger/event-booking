<template>
  <div>
    <header>
      <backButton />
    </header>
    <div class="padding">
      <router-view />
    </div>
  </div>
</template>
<script>
  import backButton from '@/components/BackButton';
  
  export default {
    components: {
      backButton
    },
  }
</script>
<style>

</style>
