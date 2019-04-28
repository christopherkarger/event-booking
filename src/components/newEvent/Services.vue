<template>
  <div>
    <ul v-if="services">
      <li v-for="(service, index) in services" :key="index">
        <input type="radio" name="employee" :value="index" :id="'service' + index" v-model="selectedService" @change="updateSelectedService(index)"/>
        <label :for="'service' + index">
          <div class="service"><b>{{ service.name }}</b></div>
          <div class="price">Price: {{ service.price }} €</div>
          <div class="duration">Duration: {{ convertDurationToString(service, true)}}</div>
        </label>
      </li>
    </ul>
  
    <nextButton v-if="selectedService !== null" @next="next" />
    
  </div>
</template>

<script>
import parentPath from '@/jsModules/parent-path';
import convertDuration from '@/jsModules/convert-duration';
import nextButton from '@/components/NextButton';

export default {

  data() {
    const getters = this.$store.getters;
    return {
      selectedService: null
    }  
  },
  
  computed: {
    services() {
      return this.$store.getters.services;
    }
  },
  
  components: {
    nextButton
  },
  
  methods: {
    convertDurationToString(service,inString) { 
      return convertDuration({
        duration: service.duration,
        inString: true
      });
    },
    

    updateSelectedService(index) {
      const service = this.services[index];
      const name = service.name;
      const employees = service.employees;

      this.$store.dispatch('updateSelectedTime', {});
      this.$store.dispatch('updateAvailableTimes', {});
      this.$store.dispatch('updateSelectedDate', {});
      this.$store.dispatch('updateSelectedService', {
        index, 
        name, 
        duration: service.duration, 
        employees,
        freeTimeBlock: (service.freeTimeBlock) ? service.freeTimeBlock : null
      });
    },
    next() {
      const _this = this;
      this.$store.dispatch('updateTransitionName', 'forth');
      this.$nextTick(() => { _this.$router.push(parentPath(_this) + '/employees'); });
    }

    
  },
  mounted() {
    const _this = this;
    
    this.$store.dispatch('updateServices', this).then(() => {
      _this.$store.dispatch('updateIsLoading', false);
    });

  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  li {
    border-top: 1px solid $color5;
    border-bottom: 1px solid $color5;
  }

  li + li {
    border-top: 0;
  }
</style>
