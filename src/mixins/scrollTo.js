export default {
  methods: { 
    scrollTo(sel) {
      this.$nextTick(() => {

        const elements = document.querySelectorAll(sel);
        const addedElement = elements[elements.length - 1];
        const rect = addedElement.getBoundingClientRect();
        const topPos = rect.top;

        if (window.scroll) {
          window.scroll({ top: topPos, behavior: 'smooth' });
        } else {
          window.scrollTo(0, topPos);
        }

      });
    }

  }

}