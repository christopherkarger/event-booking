<template>
  <div>
    <h2>Gib deinen SMS Code ein</h2>
    <input type="text" v-model="smsCode" >
    <button @click="phoneCodeLogin(smsCode)">Bestätigen</button>
  </div>   
</template>
<script>
export default {
  data() {
    return {
     smsCode: null
    }
  },

  props: ['confirmationResult'],

  methods: {
    phoneCodeLogin(smsCode) {
      this.confirmationResult.confirm(smsCode).then(function (result) {
        var user = result.user;
        console.log(user);
      }).catch(function (error) {
      });
    }
  }
}
</script>
<style>

</style>
