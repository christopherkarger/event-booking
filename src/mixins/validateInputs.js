export default {
  data() {
    return {
      validateError: []
    }
  },
  methods: {
    hasError(elmIndex, inputText) {
      if (this.validateError[elmIndex] !== undefined) {
        if (inputText.length == 0) {
          return true;
        }
      }
    },
    removeError(index) {
      if (this.validateError[index]) { this.validateError.splice(index , 1); }
    },
    addError(index, inputIndex) {
      const validateError = this.validateError;
      if (!validateError[index]) { validateError[index] = []; }
      validateError[index].push(inputIndex);
    },
    validateInputs(elements, items) {   
      this.validateError = [];      
      elements.forEach((elm,elmIndex) => {
        if (items) {
          items.forEach((item,itemIndex) => {
            if (elm[item].length === 0) {  
              this.addError(elmIndex, itemIndex);
            }
          });
        } else {
          if (typeof elm == 'string' && elm.length == 0) {
            this.addError(elmIndex, elmIndex);
          }
        }

      }); 
      
      return this.validateError.length > 0;
      
    }
  }
}
