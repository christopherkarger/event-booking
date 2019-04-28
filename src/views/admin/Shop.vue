<template>
  <div>
    
    <h2>Opening hours</h2>
    <div class="grid">
      <div class="day block" v-for="(day, dayIndex) in days" :key="dayIndex">
        <h3>{{ day.name  }}</h3>
        <div class="time-block" v-for="(times, timeIndex) in day.times" :key="'time' + timeIndex">

          <timePicker 
            v-for="(timeItem, timeItemIndex) in times" 
            :key="'timepick' + timeItemIndex" 
            @timeUpdate="updateTime({dayIndex, timeIndex, timeItemIndex}, $event)" 
            :time="timeItem" />

          <xButton @xbuttonClick="removeTime(dayIndex, timeIndex)"/>
        </div>

        <appButton @buttonClick="addTime(dayIndex)">Add time</appButton>
      </div>
    </div>

    <div class="grid">  
      <div class="address">
        <h2>Adress</h2>
        <textarea type="text" v-model="address"></textarea>
      </div> 
      <div class="telephone">
        <h2>Phone</h2>
        <input type="text" v-model="telephone" @input="delWhitespace(telephone)" />
      </div>
    </div>

    <div class="bottom-fixed">
      <appButton @buttonClick="update">Save</appButton>
    </div>

  </div>

</template>
<script>
  import timePicker from '@/components/TimePicker';
  import addLeadingZero from '@/jsModules/add-leading-zero';
  import xButton from '@/components/XButton';
  import appButton from '@/components/Button';

  export default {
    data() {
      return {
        address: this.$store.getters.shopAddress,
        telephone: this.$store.getters.shopTelephone
      }    
    },
    computed: {
      days() {
        return this.$store.getters.shopDays;
      },
      shopAddress() {
        return this.$store.getters.shopAddress;
      },
      shopTelephone() {
        return this.$store.getters.shopTelephone;
      }
    },
    components: {
      timePicker,
      xButton,
      appButton
    },
    methods: {
      updateTime(payload, newTime) {
        const shopDays = JSON.parse(JSON.stringify(this.$store.getters.shopDays));
        shopDays[payload.dayIndex].times[payload.timeIndex][payload.timeItemIndex] = `${addLeadingZero(newTime.hours)}:${addLeadingZero(newTime.minutes)}`;
        this.$store.dispatch('updateLocalShopDays', shopDays);
      },
      update() {
        const _this = this;
        this.$store.dispatch('updateIsLoading', true);

        const openingTimes = this.$firebase.database().ref('shop/openingTimes');
        const shopAddress = this.$firebase.database().ref('shop/address');
        const shopTelephone = this.$firebase.database().ref('shop/telephone'); 
        const promises = [];
        const telephone = this.telephone.split(' ').join('');

        promises.push(openingTimes.set(_this.days));
        promises.push(shopAddress.set(_this.address));
        promises.push(shopTelephone.set(telephone));

        Promise.all(promises).then(values => {
          this.$store.dispatch('updateIsLoading', false);
        });
      },
      
      addTime(dayIndex) {
        this.$store.dispatch('addShopTime', {day: dayIndex, time: ['00:00', '00:00'] });
      },

      removeTime(dayIndex, timeIndex) {
        this.$store.dispatch('removeShopTime', {day: dayIndex, timeIndex });
      },
      delWhitespace(value) {
        this.telephone = value.replace(/\s/g, '');
      }
    },
    mounted() {
      const _this = this;
      const promises = [];

      promises.push(this.$store.dispatch('updateShopDays', this));
      promises.push(this.$store.dispatch('updateShopAddress', this));
      promises.push(this.$store.dispatch('updateShopTelephone', this));
      
      Promise.all(promises).then(() => {
        this.$store.dispatch('updateIsLoading', false);
      });
    },
    watch: {
      shopAddress() {
        this.address = this.shopAddress;
      },
      shopTelephone() {
        this.telephone = this.shopTelephone;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  
  .grid{
    @extend %grid;
  }
  /deep/ .x-button {
    top: 4px;
    right: 0;
  }
  .address,
  .telephone {
    margin-bottom: 40px;
  }
</style>