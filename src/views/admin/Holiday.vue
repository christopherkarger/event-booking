<template>
  <div>
    <div class="add-item">
      <appButton @buttonClick="addHoliday">Add holiday</appButton>
    </div>
    <h2>Holiday</h2>
    <div class="grid">

      <div class="no-items-added" v-if="holidays.length == 0"><p>No holidays at the moment</p></div>

      <div class="block delete-able holiday" v-for="(holiday, holidayIndex) in holidays" :key="holidayIndex">   
        <h3>Name</h3>
        <input type="text" placeholder="USA Trip, Birthday…" v-model="holiday.name" :class="{'error': hasError(holidayIndex, holiday.name) }">
        
        <div class="all-day-event">
          <input type="checkbox" :id="'holiday' + holidayIndex" value="true" v-model="holiday.allDayEvent">
          <label :for="'holiday' + holidayIndex">Entire day</label>
        </div>


        <div class="date-wrapper">
          <div class="date">
            <div class="start-or-end">Start:</div>
            <datePicker 
              :preSelectedDate="new Date(holiday.startDate)"
              @dateUpdate="updateDate({holidayIndex, startOrEnd: 'start'}, $event)"
            />
            <timePicker 
              v-show="!holiday.allDayEvent" 
              @timeUpdate="updateTime({holidayIndex, startOrEnd: 'start'}, $event)" 
              :time="holiday.startTime" />
          </div>

          <div class="date">
            <div class="start-or-end">End:</div>
            <datePicker 
              :preSelectedDate="new Date(holiday.endDate)"
              @dateUpdate="updateDate({holidayIndex, startOrEnd: 'end'}, $event)"
            />
            <timePicker 
              v-show="!holiday.allDayEvent" 
              @timeUpdate="updateTime({holidayIndex, startOrEnd: 'end'}, $event)" 
              :time="holiday.endTime" />
          </div>
        </div>
        
        <div v-if="employees && employees.length > 1">
          <h3>Employee:</h3>
          <selectEmployees :item="holiday" :itemIndex="holidayIndex" :employees="employees" />
        </div>
        
        <xButton @xbuttonClick="removeHoliday(holidayIndex)" />
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
  import sortArray from '@/jsModules/sortArray';
  import datePicker from '@/components/DatePicker';
  import xButton from '@/components/XButton';
  import appButton from '@/components/Button';

  export default {
    data() {
      return {
        isMounted: false
      }
    },
    computed: {
      holidays() {
        return this.$store.getters.shopHolidays;
      },
      employees() {
        return this.$store.getters.employees;
      }
    },
    components: {
      selectEmployees,
      timePicker,
      datePicker,
      xButton,
      appButton
    },
    methods: {
      updateTime(payload, newTime) {
        const shopHolidays = JSON.parse(JSON.stringify(this.$store.getters.shopHolidays));
        shopHolidays[payload.holidayIndex][payload.startOrEnd + 'Time'] = `${addLeadingZero(newTime.hours)}:${addLeadingZero(newTime.minutes)}`;
        this.$store.dispatch('updateLocalShopHolidays', shopHolidays);
      },
      updateDate(payload, newDate) {
        const shopHolidays = JSON.parse(JSON.stringify(this.$store.getters.shopHolidays));
        shopHolidays[payload.holidayIndex][payload.startOrEnd + 'Date'] = newDate.getTime();
        this.$store.dispatch('updateLocalShopHolidays', shopHolidays);
      },
      addHoliday() {
        const today = new Date();
        today.setHours(0,0,0,0);

        this.$store.dispatch('addShopHoliday', { 
          name: '',
          allDayEvent: true,
          startDate: today.getTime(),
          startTime: "09:00",
          endDate: today.getTime(),
          endTime: "17:30",
          employees: ['all']
        });
        this.scrollTo('.holiday');
      },
      removeHoliday(shopHolidayIndex) {
        this.removeError(shopHolidayIndex);
        this.$store.dispatch('removeShopHoliday', shopHolidayIndex);
      },

      toDate(holiday, startOrEnd) {
        const date = new Date(holiday[startOrEnd + 'Date']);
        const hours = holiday[startOrEnd + 'Time'].split(':')[0];
        const minutes = holiday[startOrEnd + 'Time'].split(':')[1];
        date.setHours(hours,minutes,0,0);
        return date.getTime();
      },
      
      updateTimeString() {
        const _this = this;
        const holidays = JSON.parse(JSON.stringify(this.holidays));
        
        holidays.forEach(holiday => {
          if (!holiday.allDayEvent) {
            holiday.startDate = _this.toDate(holiday, 'start');
            holiday.endDate = _this.toDate(holiday, 'end');
          }
        });

        this.$store.dispatch('updateLocalShopHolidays', holidays);
      },


      update() {
        const _this = this;
        const hasError = this.validateInputs(this.holidays, ['name']);
        if (hasError) { return; }
        
        this.updateTimeString();

        this.$store.dispatch('updateIsLoading', true);        
        
        const shopHolidays = this.$firebase.database().ref('shop/holidays');
        shopHolidays.set(_this.holidays).finally(() => {
          _this.$store.dispatch('updateIsLoading', false);
        });
      }
    },
    
    mounted() {
      const _this = this;
      const promises = [];

      promises.push(this.$store.dispatch('updateShopHolidays', {scope: this}));
      promises.push(this.$store.dispatch('updateEmployees', this));
      
      Promise.all(promises).then(() => {
        this.$store.dispatch('updateIsLoading', false);
      });

    },
    mixins: [validateInputs, scrollTo]
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/classes.scss';  
  
  .grid{
    @extend %grid;
  }
  
  .time-picker {
    margin-left: 20px;
  }
  .date,
  .start-or-end {
    display: flex;
  }

  .date-wrapper {
    margin-bottom: 20px;
  }

  .date + .date {
    margin-top: 10px;
  }

  .start-or-end {
    min-width: 50px;
    padding-top: 10px;
  }

  .all-day-event {
    margin-bottom: 20px;
  }

  input[type=date] + input[type=time] {
    margin-left: 10px;
  }
  
  .add-item button {
    margin-left: auto
  }
</style>