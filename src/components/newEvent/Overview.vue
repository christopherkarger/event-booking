<template>
  <div class="block">
    <div class="employee-image" v-if="employeeImageSrc">
      <img :src="employeeImageSrc" />
    </div>
    
    <p v-if="isAdmin">
      <b>{{ employee }} will be the hairdresser</b>
    </p>  
    <p v-else>
      <b>{{ employee }}</b>
    </p>

    <h3>When</h3>
    <p>{{ convertedDate }} at {{ convertedTime }}</p>
    <h3>Service</h3>
    <p>{{ service }}</p>
    
    <template v-if="customerName">
      <h3>Customer</h3>
      <p>{{ customerName }}</p>
    </template>

    <template v-if="customerTel">
      <h3>Phone</h3>
      <p>{{ customerTel }}</p>
    </template>
    
    <nextButton @next="submit" :text="'Book now'" />
  </div>
</template>
<script>
import parentPath from '@/jsModules/parent-path';
import addLeadingZero from '@/jsModules/add-leading-zero';
import store from '@/store';
import router from '@/router';
import getAvailableTimes from '@/jsModules/core/getAvailableTimes';
import nextButton from '@/components/NextButton';
import convertDuration from '@/jsModules/convert-duration';

export default {
  data() {
    const getters = this.$store.getters;
    const employees = getters.employees;
    const employeeIndex = getters.selectedEmployee.index;

    return {
      employeeImageSrc: employees[employeeIndex].profilImage ? employees[employeeIndex].profilImage.src : null,
      customerName: this.$store.getters.customerName,
      customerTel: this.$store.getters.customerTel,
      employee: this.$store.getters.selectedEmployee.name,
      service: this.$store.getters.selectedService.name
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    date() {
      return this.$store.getters.selectedDate;
    },
    convertedDate() {
      return `${this.date.date.getDate()}.${this.date.date.getMonth() + 1}.${this.date.date.getFullYear()}`;
    },
    convertedTime() {
      return `${addLeadingZero(this.time.time.getHours())}:${addLeadingZero(this.time.time.getMinutes())}`;
    },
    time() {
      return this.$store.getters.selectedTime;
    }
  },
  
  components: {
    nextButton
  },

  methods: {
    addLeadingZero(val) {
      return addLeadingZero(val);
    },
    async submit() {
      const _this = this;
      const getters = this.$store.getters;
      const employee = this.employee;
      const service = this.service;
      const date = this.date.date;
      const time = this.time.time;
      const duration = getters.selectedService.duration;
      const customerName = getters.customerName || false;
      const customerTel = getters.customerTel || false;
      const convertedDate = new Date(date.getTime());
      
      convertedDate.setHours(time.getHours());
      convertedDate.setMinutes(time.getMinutes());

      const timestamp = convertedDate.getTime();
      const timestampEnd = timestamp + convertDuration({duration});
  
      const availableTimes = await getAvailableTimes();
      let timeStillAvailable = false;
      
      availableTimes.forEach(date => {
        if (timestamp == date.getTime()) { timeStillAvailable = true; }
      });
  
      if (timeStillAvailable) {
        try {   
          this.$store.dispatch('updateIsLoading', true);
          const events = this.$firebase.database().ref('events');
          events.push({
            dayTimeStamp: date.getTime(),
            uid: getters.uid,
            timestamp,
            timestampEnd,
            employee,
            service,
            duration,
            freeTimeBlock: getters.selectedService.freeTimeBlock || null,
            customerName,
            customerTel
          },() => {
            
            _this.$router.push(parentPath(_this) + '/confirmation');
            _this.$store.dispatch('updateIsLoading', false);
          });

        } catch (error){
          console.log(error);
          console.log('event konnte nicht gespeichert werden');
        }
      } else {
        alert('Event leider nicht mehr buchbar');
      }  

    }
  },
  
  beforeRouteEnter (to, from, next) {
    if (store.getters.selectedDate.index !== undefined) {
      next();
    } else {
      console.log('go back');
      router.go(-1);
    } 
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  h3 {
    margin-bottom: 3px;
    font-size: 18px;
    color: $color6;
  }

  p {
    font-size: 16px;
  }
  
  .employee-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    img {
      max-width: 170px;
    }
    
  }
</style>
