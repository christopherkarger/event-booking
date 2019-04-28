<template>
  <div>
    <input type="text" placeholder="Name" v-model="name" @blur="updateCustomerName">
    <input type="tel" placeholder="Phonenumber" v-model="tel" @blur="updateCustomerTel">

    <nextButton @next="next" v-if="isAdmin || (name.length > 0 && tel.length > 0)" />

  </div>
</template>

<script>
  import parentPath from '@/jsModules/parent-path';
  import nextButton from '@/components/NextButton';

  export default {
    data() {
      return {
        name: this.$store.getters.customerName,
        tel: this.$store.getters.customerTel
      }
    },
    components: {
      nextButton
    },
    computed: {
      isAdmin(){
        return this.$store.getters.isAdmin;
      },
    },
    methods: {
      updateCustomerTel(event){
        this.$store.dispatch('updateCustomerTel', event.target.value);
      },
      updateCustomerName(event) {
        this.$store.dispatch('updateCustomerName', event.target.value);
      },
      next() {
        const _this = this;
        this.$router.push(parentPath(_this) + '/overview');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>