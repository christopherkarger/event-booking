const resetEventProcess = {
  methods: {
    resetEventProcess() {
      this.$store.dispatch('updateSelectedTime', {});
      this.$store.dispatch('updateAvailableTimes', {});
      this.$store.dispatch('updateSelectedDate', {});
      this.$store.dispatch('updateSelectedEmployee', {});
      this.$store.dispatch('updateSelectedService', {});
      this.$store.dispatch('updateCustomerName', null);
      this.$store.dispatch('updateCustomerTel', null);
      this.$store.dispatch('updateSelectedDateAndTimeMessage', null);
    }
  }
}

export default resetEventProcess;