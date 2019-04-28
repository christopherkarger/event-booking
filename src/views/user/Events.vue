<template>
  <div class="my-events padding">
    <h2>My appointments</h2>
    <div :class="eventIsPast(event.timestamp)" class="event" v-for="(event, key) in events" :key="key">
      <ul>
        <li class="date">{{ date(event.timestamp) }}</li>
        <li>When: {{ time(event.timestamp) }}</li>
        <li>Service: {{ event.service }}</li>
        <li>Employee: {{ event.employee }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import sortArray from '@/jsModules/sortArray';
  import addLeadingZero from '@/jsModules/add-leading-zero';

  export default {
    data() {
      return {
        events: []
      }
    },

    methods: {
      eventIsPast(timestamp) {
        const newDate = new Date().getTime();

        if (timestamp < newDate) {
          return 'past-event';
        } else {
          return false;
        }

      },
      date(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}.${(date.getMonth() + 1)}`;
      },

      time(timestamp) {
        const date = new Date(timestamp);
        return `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
      },
    },
    mounted() {
      const _this = this;
      const uid = this.$store.getters.uid;
      this.$store.dispatch('updateIsLoading', true);
      const eventsDatabase = this.$firebase.database().ref('events').orderByChild('uid').equalTo(uid);
      try {
        eventsDatabase.once('value', (snapshot) => {
          if (snapshot.val()) {
            const userEvents = snapshot.val();
            let events = [];
            for (let key in userEvents) {
              events.push(userEvents[key]);
            }
            
            events = sortArray('descending', events, 'timestamp');
            _this.events = events;
          }
          this.$store.dispatch('updateIsLoading', false);
        }); 
      }
      catch(error) {
        console.log(error);
        this.$store.dispatch('updateIsLoading', false);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .my-events {
    background: $color3;
  }
  .date {
    font-weight: bold;
    font-size: 18px;
    color: $color1;
    position: absolute;
    top: 24px;
    left: 17px;
  }
  .event {
    position: relative;
    margin-bottom: 20px;
    background: #fff;
    border-bottom: 3px solid $color5;
    padding: 10px 10px 10px 80px;
    &.past-event {
      opacity: .5;
    }
  }
</style>