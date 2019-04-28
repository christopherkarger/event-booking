<template>
  <div class="time-picker">
    <div class="time" @click="dropdownVisible = !dropdownVisible">{{ addLeadingZero(hours) }}:{{ addLeadingZero(minutes) }}</div>
    <div class="time-picker-overlay" v-if="dropdownVisible" @click="dropdownVisible = false"></div>
    <div class="dropdown" v-if="dropdownVisible">
      <div class="select-list">
        <ul class="hours">
          <li class="hint">h.</li>
          <li v-for="hour in 24" :key="'h' + hour" @click="changeHour(hour)" :class="{'active': hour == activeHour}">
            {{ addLeadingZero(hour - 1)}}
          </li>
        </ul>
        <ul class="minutes">
          <li class="hint">m.</li>
          <li v-for="minute in 60" :key="'m' + minute" @click="changeMinute(minute)" :class="{'active': minute == activeMinute}">
            {{ addLeadingZero(minute - 1) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import addLeadingZero from '@/jsModules/add-leading-zero';

  export default {
    data() {
      return {
        dropdownVisible: false,
        hours: null,
        minutes: null,
        activeHour: null,
        activeMinute: null
      }
    },
    props: ['time'],
    methods: {
      setTimes() {
        if (typeof this.time === 'string') {
          const timeArray = this.time.split(':');
          this.hours = parseInt(timeArray[0]);
          this.minutes = parseInt(timeArray[1]);
          this.activeHour = parseInt(timeArray[0]) + 1;
          this.activeMinute = parseInt(timeArray[1]) + 1;
        } else {
          this.hours = this.time.hours;
          this.minutes = this.time.minutes;
          this.activeHour = parseInt(this.time.hours) + 1;
          this.activeMinute = parseInt(this.time.minutes) + 1;
        }
      },
      addLeadingZero(number) {
        return addLeadingZero(number);
      },
      emitEvent() {
        this.$emit('timeUpdate', {hours: this.hours, minutes: this.minutes });
      },
      changeHour(hour) {
        this.activeHour = hour;
        this.hours = hour - 1;
        this.emitEvent();
      },
      changeMinute(minute) {
        this.activeMinute = minute;
        this.minutes = minute - 1;
        this.emitEvent();
      }
    },

    watch: {
      time() {
        //this.setTimes();
      }
    },
    
    mounted() {
      this.setTimes();
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .time-picker {
    position: relative;
    width: 100%;
    &:before,
    &:after {
      display: block;
      pointer-events: none;
      content: '\f106';
      font-family: $icon;
      position: absolute;
      top: 8px;
      right: 8px;
    }
    &:after {
      top: 18px;
      transform: rotate(180deg);
    }

  }
  .time {
    cursor: pointer;
    border: 1px solid $color4;
    width: 100%;
    min-height: 40px;
    padding: .7em .5em 0;
    font-size: 1em;
    user-select: none;
    border-radius: 5px;
    box-sizing: border-box;
    flex: 0 0 auto;
  }

  .time-picker-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  } 

  .dropdown {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,.15);
    width: 100%;
    height: 10em;
    font-weight: 400;
  }

  .select-list {
    width: 100%;
    height: 10em;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: stretch;
    justify-content: space-between;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    user-select: none;
    &.minutes {
      border-left: 1px solid $color3;
    }
  }

  li {
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    
    &:not(.hint):not(.active):hover  {
      background: $color3;
    }

    &.active{
      background: $color1;
      color: #fff;
    }
  }

  .hint {
    color: $color6;
    cursor: default;
    font-size: .8em;
    padding: .3em 0;
  }
</style>