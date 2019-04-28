<template>
  <div>
    <ul v-if="employees">
      <li v-for="(employee, index) in employees" :key="index">
        <input type="radio" name="employee" :value="index" :id="'employee' + index" v-model="selectedEmployee" @change="updateSelectedEmployee(employee.index, index)"/>
        <label :for="'employee' + index">    
            <img v-if="employee.profilImage" class="employee-image" :src="employee.profilImage.src">
          {{ employee.name }}
        </label>
      </li>
    </ul>

    <nextButton v-if="selectedEmployee !== null" @next="next" />
    
  </div>
</template>

<script>
import parentPath from '@/jsModules/parent-path';
import nextButton from '@/components/NextButton';

export default {
  data() {
    const getters = this.$store.getters;
    return {
      selectedEmployee: null,
      //selectedEmployee: getters.selectedEmployee.hasOwnProperty('listIndex') ? getters.selectedEmployee.listIndex : null
    }  
  },
  computed: {
    employees() {
      const getters = this.$store.getters;
      const employees = getters.employees;
      const serviceIds = getters.selectedService.employees;
      let filteredEmployees = [];

      if (serviceIds[0] == 'all') {
        filteredEmployees = employees;
      } else {
        employees.forEach((elm, index) => {
          if (serviceIds.indexOf(elm.id) > -1) {
            filteredEmployees.push(elm);
          }
        });
      }
      
      return filteredEmployees;
    }
  },

  components: {
    nextButton
  },
  
  methods: {

    updateSelectedEmployee(employeeIndex, listIndex) {
      const employee = this.$store.getters.employees[employeeIndex];
      const name = employee.name;
      const id = employee.id;
      this.$store.dispatch('updateSelectedTime', {});
      this.$store.dispatch('updateAvailableTimes', {});
      this.$store.dispatch('updateSelectedDate', {});
      this.$store.dispatch('updateSelectedEmployee', { 
        index: employeeIndex,
        listIndex, 
        name, 
        id 
      });
    },
    next() {
      const _this = this;
      this.$store.dispatch('updateTransitionName', 'forth');
      this.$nextTick(() => { _this.$router.push(parentPath(_this) + '/date'); });
    }
  
  },
  mounted() {
    this.$store.dispatch('updateSelectedEmployee', {}); 
    this.$store.dispatch('updateEmployees', this).then(() => {
      this.$store.dispatch('updateIsLoading', false);
    });
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: block;
    padding-left: 80px;
    height: 64px;
    display: flex;
    align-items: center;
    font-weight: bold;
    &:before {
      width: 60px;
      height: 60px;
    }   

    &:after {
      font-size: 28px;
      left: 15px;

    }
  }

  input[type=radio]:checked + label:after {
    opacity: .8;
  }

  li + li {
    margin-top: 25px;
  }

  ul{
    margin-top: 0;
  }

  .employee-image {
    width: 64px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
</style>
