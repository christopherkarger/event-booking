<template>
  <div>
    <div class="add-item">
      <appButton @buttonClick="addService">Add Service</appButton>
    </div>
    <h2>Services</h2>
    <div class="grid">

      <div class="no-items-added" v-if="services.length == 0"><p>Please add a service</p></div> 

      <div class="block delete-able service" v-for="(service, serviceIndex) in services" :key="'service' + serviceIndex">   
        <h3>Name of service</h3>
        <input type="text" placeholder="Name of service" v-model="service.name" :class="{'error': hasError(serviceIndex, service.name) }">

        <h3>Duration</h3>
        <div class="duration">
          <timePicker 
            @timeUpdate="updateTime({ serviceIndex }, $event)" 
            :time="service.duration" />
        </div>

        <h3>Price</h3>
        <div class="money">
          <input type="text" placeholder="price" v-model="service.price" :class="{'error': hasError(serviceIndex, service.price) }">
        </div>
        <div class="service-employees" v-if="employees && employees.length > 1">
          <h3>Which employee offers this service</h3>
          <selectEmployees :item="service" :itemIndex="serviceIndex" :employees="employees" />
        </div>

        <div class="free-time-block">
          <h3>Does the employee have time during the service</h3>
          <div>
            <p>After how many hours or minutes?</p>
            <timePicker 
              @timeUpdate="updateFreeTimeBlock({ serviceIndex, startOrDuration: 'start' }, $event)" 
              :time="service.freeTimeBlock && service.freeTimeBlock.start ? service.freeTimeBlock.start : '00:00'" />
          </div>
          <div>
            <p>How long ?</p>
            <timePicker 
              @timeUpdate="updateFreeTimeBlock({ serviceIndex, startOrDuration: 'duration' }, $event)" 
              :time="service.freeTimeBlock && service.freeTimeBlock.duration ? service.freeTimeBlock.duration : '00:00'" />
          </div>
        </div>
        
        <xButton @xbuttonClick="removeService(serviceIndex)" />
      </div>
      
    </div>
    

    <div class="bottom-fixed">
      <appButton @buttonClick="update">Save</appButton>
    </div>
  </div>
</template>

<script>
  import validateInputs from '@/mixins/validateInputs';
  import scrollTo from '@/mixins/scrollTo';
  import selectEmployees from '@/components/SelectEmployees';
  import timePicker from '@/components/TimePicker';
  import addLeadingZero from '@/jsModules/add-leading-zero';
  import xButton from '@/components/XButton';
  import appButton from '@/components/Button';

  export default {
    data() {
      return {
        error: []
      }
    },
    computed: {
      services() {
        return this.$store.getters.services;
      },
      employees() {
        return this.$store.getters.employees;
      }
    },
    components: {
      selectEmployees,
      timePicker,
      xButton,
      appButton
    },
    methods: {
      hasValidFreeTimeBlock(freeTimeBlock) {
        if ( (freeTimeBlock.start.hours || freeTimeBlock.start.minutes )
            && (freeTimeBlock.duration.hours || freeTimeBlock.duration.minutes ) ) {
              return true;
            } else {
            return false;
        }
      },
      checkFreeTimeBlocks() {
        const shopServices = JSON.parse(JSON.stringify(this.$store.getters.services));
        
        shopServices.forEach((service, i) => {
          if (service.freeTimeBlock) {
            const isFreeTimeBlockValid = this.hasValidFreeTimeBlock(service.freeTimeBlock);
            if (!isFreeTimeBlockValid) {
              service.freeTimeBlock = null;
            }
          }
        });

        this.$store.dispatch('updateLocalServices', shopServices);

      },
      updateFreeTimeBlock(payload, time) {
        const shopServices = JSON.parse(JSON.stringify(this.$store.getters.services));
        if (!shopServices[payload.serviceIndex].freeTimeBlock) {
          shopServices[payload.serviceIndex].freeTimeBlock = {};
        }

        if (!shopServices[payload.serviceIndex].freeTimeBlock.start) {
          shopServices[payload.serviceIndex].freeTimeBlock.start = { hours: 0, minutes: 0 };
        }

        if (!shopServices[payload.serviceIndex].freeTimeBlock.duration) {
          shopServices[payload.serviceIndex].freeTimeBlock.duration = {};
        }
        
        shopServices[payload.serviceIndex].freeTimeBlock[payload.startOrDuration].hours = time.hours;
        shopServices[payload.serviceIndex].freeTimeBlock[payload.startOrDuration].minutes = time.minutes;

        this.$store.dispatch('updateLocalServices', shopServices);
      },

      updateTime(payload, newDuration) {
        const shopServices = JSON.parse(JSON.stringify(this.$store.getters.services));
        shopServices[payload.serviceIndex].duration = newDuration;
        this.$store.dispatch('updateLocalServices', shopServices);
      },
      update() {
        const _this = this;
        
        const hasError = this.validateInputs(this.services, ['name', 'price']);
        if (hasError) { return; }

        this.checkFreeTimeBlocks();
        this.$store.dispatch('updateIsLoading', true);        
        
        const shopServices = this.$firebase.database().ref('shop/services');
        shopServices.set(_this.services).finally(() => {
          _this.$store.dispatch('updateIsLoading', false);
        });
      },

      addService() {
        this.$store.dispatch('addService', { 
          name: '', 
          duration: {
            hours: '0',
            minutes: '30'
          },
          price: '', 
          employees: ['all'] 
        });
        this.scrollTo('.service');
      },

      removeService(serviceIndex) {
        this.removeError(serviceIndex);
        this.$store.dispatch('removeService', serviceIndex);
      },

      checkIfAtLeast5Minutes(serviceIndex, unit) {
        const service = this.services[serviceIndex];
        const timeHour = parseInt(service.duration.hours);
        const timeMinute = parseInt(service.duration.minutes);
        
        if (timeHour == 0 && timeMinute == 0) {
          if (unit == 'minute') { service.duration.hours = 1; }
          if (unit == 'hour') { service.duration.minutes = 5; }
        }
      }
    },
    mounted() {
      const _this = this;
      const promises = [];

      promises.push(this.$store.dispatch('updateServices', this));
      promises.push(this.$store.dispatch('updateEmployees', this));
      
      Promise.all(promises).then(() => {
        this.$store.dispatch('updateIsLoading', false);
      });
    },
    mixins: [validateInputs, scrollTo]
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  
  .grid{
    @extend %grid;
  }

  h3 {
    margin-bottom: 10px;
  }
  .duration {
    margin-bottom: 20px;
  }

  .money {
    position: relative;

    &:before {
      content: '\F153';
      font-family: "font_awesome";
      display: block;
      position: absolute;
      top: 12px;
      right: 9px;
      color: $color7;
      font-size: 16px;
      z-index: 1;
    }
  }

  .add-item button {
    margin-left: auto
  }

  .service-employees {
    margin-bottom: 20px;
  }

  .free-time-block {
    & > div + div {
      margin-top: 20px;
    }
  }
</style>