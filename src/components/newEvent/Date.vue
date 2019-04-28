<template>
  <div>
    <div class="date-picker">
      <ul class="dates">
        <li v-for="(day,index) in days" :key="'day' + index" :class="{'closed': day.closed }" >
          <input type="radio" :id="'date' + index" :value="index" name="date" v-model="selectedDate" @change="updateSelectedDate(index)" :disabled="day.closed">
          <label :for="'date' + index">
           <div>{{ day.shortname }}</div>
           <div>{{ day.date.getDate() }}.{{ day.date.getMonth() + 1}}</div>
            
          </label>
        </li>
      </ul>
    </div>
    <div class="time-picker">
      <ul class="times" v-if="times.length > 0">
        <li v-for="(time,index) in times" :key="'time' + index">
          <input type="radio" :id="'time' + index" :value="index" name="time" v-model="selectedTime" @change="updateSelectedTime(index)">
          <label :for="'time' + index">
            <div>{{ addLeadingZero(time.getHours()) }} : {{ addLeadingZero(time.getMinutes()) }}</div>
          </label>
          
        </li>
      </ul>
      <p v-if="infoMessage">{{ infoMessage }}</p>
      <p class="hint" v-if="!infoMessage && selectedDate === null">Choose a time</p>
    </div>

    <nextButton v-if="selectedDate !== null && selectedTime !== null" @next="next" />
    
  </div>
</template>

<script>

import parentPath from '@/jsModules/parent-path';
import addLeadingZero from '@/jsModules/add-leading-zero';
import getAvailableTimes from '@/jsModules/core/getAvailableTimes';
import getAvailableDates from '@/jsModules/core/getAvailableDates';
import nextButton from '@/components/NextButton';

export default {
  data() {
    return { 
      days: [],
      times: [],
      selectedTime: null,
      selectedDate: null
      //selectedDate: getters.selectedDate.hasOwnProperty('index') ? getters.selectedDate.index : null
    }
  },
  computed: {
    infoMessage() {
      return this.$store.getters.selectedDateAndTimeMessage;
    }
  },
  
  components: {
    nextButton
  },


  methods: {
    addLeadingZero(val) {
      return addLeadingZero(val);
    },

    async setTimes() {
      this.$store.dispatch('updateIsLoading', true);
      let availableTimes = await getAvailableTimes();
      
      if (Array.isArray(availableTimes)) {
        if (availableTimes.length == 0) {
          this.$store.dispatch('updateSelectedDateAndTimeMessage', 'Leider schon voll');
        } else {
          this.$store.dispatch('updateSelectedDateAndTimeMessage', null);
        }
      } else {
        this.$store.dispatch('updateSelectedDateAndTimeMessage', 'Mitarbeiter arbeitet nicht');
      }
      
      //this.$store.dispatch('updateAvailableTimes', availableTimes);
      this.times = availableTimes;
      this.$store.dispatch('updateIsLoading', false);
    },

    updateSelectedDate(index) {
      const thisDay = this.days[index];
      const weekindex = thisDay.index;
      const date = thisDay.date;

      this.$store.dispatch('updateSelectedDate', {index, date, weekindex});
      this.$store.dispatch('updateSelectedTime', {});
      this.selectedTime = null;
      this.setTimes();
    },

    updateSelectedTime(index) {
      const time = this.times[index];
      this.$store.dispatch('updateSelectedTime', {index, time});
    },

    next() {
      let pathName = '/overview';
      if (this.$store.getters.isAdmin || !this.$store.getters.userName) {
        pathName = '/info';
      }
      this.$store.dispatch('updateTransitionName', 'forth');
      this.$nextTick(() => { this.$router.push(parentPath(this) + pathName); });
    }
  },

  async mounted() {
    this.days = await getAvailableDates(this);
    this.$store.dispatch('updateIsLoading', false);
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .hint {
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    color: $color6;
    padding-top: 50px;
    &:before {
      content: '\f073';
      font-family: $icon;
      display: block;
      font-weight: normal;
      font-size: 3em;
      margin-bottom: .2em;
    }
  }
  .weekdays {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  label {
    padding-right: 2px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .dates {
    display: flex;
    overflow: auto;
    padding-bottom: 10px;
    border-bottom: 1px solid $color5;
    
    li.closed {
      opacity: .3;
      cursor: default;
      pointer-events: none;
    }

    li + li {
      margin-left: 10px;
    }
  }
  .times {
    li {
      border-bottom: 1px solid $color5;
    }
    li + li {
      border-top: none;
    }
  }
</style>