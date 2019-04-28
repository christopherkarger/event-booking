<template>
  <ul v-if="employees && employees.length > 1">
    <li>
      <input type="checkbox" value="all" :id="'all-employees' + itemIndex" v-model="item.employees" @change="handleEmployeesCheckboxes('all', item.employees)" :disabled="item.employees && item.employees.indexOf('all') > -1"/>
      <label :for="'all-employees' + itemIndex">All</label>
    </li>
    
    <li v-for="(employee, index) in employees" :key="index + 1">
      <input type="checkbox" :value="employee.id" :id="'employee' + itemIndex + index" v-model="item.employees" @change="handleEmployeesCheckboxes(index, item.employees)"/>
      <label :for="'employee' + itemIndex + index">
        {{ employee.name }}
      </label>
    </li>
  </ul>
</template>
<script>
  import cleanArray from '@/jsModules/clean-array';
  export default {
    methods: {
      
      handleEmployeesCheckboxes(index, employee){
        if (index == 'all') { 
          employee = cleanArray(employee, 'all');
        } else {
          if (employee.indexOf('all') > -1) {
            employee.splice(employee.indexOf('all'), 1);
          }
        }

        if (employee.length == 0) { employee.push('all'); }

      },
    },
    props: ['item', 'itemIndex', 'employees']
  }
</script>
<style>
</style>