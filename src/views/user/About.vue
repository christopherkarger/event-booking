<template>
  <div class="padding">
    
    <div  v-if="shopTelephone">
      <h2>Phone</h2>
      <div class="telephone">
        <a class="btn" :href="'tel:' + shopTelephone">Call us</a>
      </div>
    </div>

    <div  v-if="shopAddress">
      <h2>Address</h2>
      <div class="block address">
       <p> {{ shopAddress }}</p>
        <a class="btn" target="_blank" :href="getGoogleLink(shopAddress)">Address on google maps</a>
      </div>
    </div>

    <div  v-if="openingHours.length > 0">
      <h2>Opening hours</h2>
      <ul class="block opening-hours">   
        <li class="day flex-center" v-for="(day, index) in openingHours" :key="'day' + index">
            <h4>{{ day.name }}</h4>
            <ul class="daytime">
              <li v-for="(time, timeIndex) in day.times" :key="'time' + timeIndex">
                {{ time[0] }} - {{ time[1] }}
              </li>
            </ul>
            <template v-if="day.times.length === 0"><div>Closed</div></template>
        </li>
      </ul>
    </div>

    <div v-if="shopEmployees.length > 0">
      <h2>Service times of employees</h2>
      <div class="all-employees">
        <div class="block employee" v-for="(employee, index) in shopEmployees" :key="'employee' + index">
          <h3>{{ employee.name }}</h3>
      
           <ul v-if="employee.days.length > 0">
            <li class="employee-day flex-center" v-for="(day, index) in employee.days" :key="'employeeDay' + index">
              <h4>{{ day.name }}</h4>
              <ul>
                <li v-for="(time, timeIndex) in day.times" :key="'time' + timeIndex">
                  {{ time[0] }} - {{ time[1] }}
                </li>
              </ul>
            </li>
          </ul>
          <p v-else>
            <b>Same as opening hours</b>
          </p>
        </div>
      </div>    
    </div>

  </div>
</template>
<script>
export default {
  computed: {
    openingHours() {
      if (this.$store.getters.shopDaysWereLoaded) {
        return this.$store.getters.shopDays;
      } else {
        return [];
      }
    },
    shopEmployees() {
      const employees = JSON.parse(JSON.stringify(this.$store.getters.employees));
      employees.forEach(em => {
        em.days = em.days.filter((day) => {
          return day.times.length > 0
        });  
      });
      return employees;
    },
    shopAddress() {
      return this.$store.getters.shopAddress;
    },
    shopTelephone() {
      return this.$store.getters.shopTelephone;
    }
  },
  methods: {
    getEmployeeWorkingDays(days) {
      return days.filter((day) => {
        return day.times.length > 0
      });
    },
    getGoogleLink(address) {
      return 'http://maps.google.com/maps?q="' + encodeURIComponent(address);
    }
  },
  mounted() {
    const promises = [];

    if (!this.$store.getters.shopAddress) {
      promises.push(this.$store.dispatch('updateShopAddress', this));
    }

    if (!this.$store.getters.shopTelephone) {
      promises.push(this.$store.dispatch('updateShopTelephone', this));
    }

    if (!this.$store.getters.shopDaysWereLoaded) {
      promises.push(this.$store.dispatch('updateShopDays', this)); 
    }
    
    if (this.$store.getters.employees.length == 0) {
      promises.push(this.$store.dispatch('updateEmployees', this));
    }

    if (promises.length > 0) {
      Promise.all(promises).then(values => {
        this.$store.dispatch('updateIsLoading', false);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';

  .btn {
    @extend %button;
  }
  .block + .block {
    margin-top: 30px;
  }

  .opening-hours,
  .address,
  .telephone {
    margin-bottom: 40px; 
  }

  .telephone {
    a {
      max-width: 60%;
      font-size: 16px;
      &:before {
        display: inline-block;
        content: '\f095';
        font-family: $icon;
        transform: rotate(90deg);
        margin: 0 15px 0 0;
      }
    }
  }
 
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-center + .flex-center {
    margin-top: 20px;
  }
</style>