export default {
  methods: {
    switchToView(name, path) {
      this.$store.dispatch('updateTransitionName', name);
      this.$nextTick(() => { this.$router.push(path); });
    }
  }
}