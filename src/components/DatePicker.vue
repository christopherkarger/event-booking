<template>
  <datePicker 

    :highlighted="highlighted"
    @closed="changeDate"
    v-model="date"
    :inputClass="'date-picker-input'"
    :wrapperClass='classOfWrapper'

  />

</template>
<script>
  import datePicker from 'vuejs-datepicker';

  export default {
    data() {
      return {
        date: this.preSelectedDate ? this.preSelectedDate : new Date(),
        highlighted: {
          dates: [
            new Date()
          ]
        }
      }
    },
    props: ['preSelectedDate', 'classOfWrapper'],
    components: {
      datePicker
    },
    methods: {
      changeDate(){
        this.$emit('dateUpdate', this.date)
        console.log(this.date);
      }
    }
    
  }
</script>

<style lang="scss" scoped>
   /deep/.vdp-datepicker {
    position: relative;
    width: 100%;
     
    .date-picker-input[type=text] {
      cursor: pointer;
      margin: 0;
    }

    .vdp-datepicker__calendar {
      top: calc(100% + 3px);
      width: 100%;
      max-width: 400px;
      min-width: 300px;
      z-index: 1;
    }
  }
</style>