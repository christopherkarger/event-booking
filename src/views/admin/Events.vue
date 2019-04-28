<template>
  <div>
    <div class="add-item">
      <appButton @buttonClick="addNewEvent">Add a new appointment</appButton>
    </div>
    <h2>Events</h2>
     
    <router-view />
    <div class="no-items-added" v-if="days.length == 0"><p>No bookings at the moment</p></div> 
    
    <modal v-if="showModal" :clickedBlackout="resetDelete">
      <p><b>Would really like to cancel this booking?</b></p>
      <div class="action">
        <appButton @buttonClick="deleteEvent">Yes</appButton>
        <appButton @buttonClick="resetDelete" :danger="true">No</appButton>
      </div>
    </modal>

    <div class="cal" v-if="days.length > 0">
      <div class="day block" v-for="(day,key) in days" :key="key">
        <div class="day-info">
          <h3>{{ getWeekDay(day[0]) }}</h3>
          <h4>{{ getDate(day[0]) }}</h4>
        </div>
        <div class="event" v-for="(event,index) in day" :key="index">
          <ul>
            <li class="time">{{ getEventTime(event) }}</li>
            <li v-if="shopUserName(event)">
              <span class="title">Customer:</span> {{ shopUserName(event) }}
            </li>
            
            <li><span class="title">Service:</span> {{ event.service }}</li>
          
            <li v-if="shopUserTel(event)">
              <span class="title">Phone:</span> {{ shopUserTel(event) }}
            </li>
            <li><span class="title">Employee:</span> {{ event.employee }}</li>

          </ul>
          <xButton @xbuttonClick="prepareEventDelete(event)" />
        </div>
      </div>
    </div>
  

  </div>
</template>
<script>
import weekdays from '@/jsModules/days';
import dateToWeekday from '@/jsModules/date-to-weekday';
import sortArray from '@/jsModules/sortArray';
import sortEventDaysArray from '@/jsModules/sortEventDaysArray';
import addLeadingZero from '@/jsModules/add-leading-zero';
import modal from '@/components/Modal';
import xButton from '@/components/XButton';
import appButton from '@/components/Button';

export default {
  data() {
    return {
      showModal: false,
      eventToDelete: null
    }

  },
  computed: {
    days() {
      const shopEvents = this.$store.getters.shopEvents;
      return shopEvents;  
    }
  },
  components: {
    modal,
    xButton,
    appButton
  },
  methods: {
    
    resetDelete() {
      this.showModal = false;
      this.eventToDelete = null;
    },

    prepareEventDelete(event) {
      this.showModal = true;
      this.eventToDelete = event;
    },
    
    deleteEvent() {
      const event = this.eventToDelete;
      const thisEvent = this.$firebase.database().ref('events/' + event.key);
      thisEvent.remove();
      this.resetDelete();
    },

    addNewEvent() {
      this.$router.push('/admin/events/new-event');
    },

    shopUserTel(event) {
      const shopUser = this.$store.getters.shopUsers[event.uid];
      if (event.customerTel) {
        return event.customerTel;
      } else if (shopUser) {
        return shopUser.customerTel;
      } else {
        return false;
      }
    },

    shopUserName(event) {
      const shopUser = this.$store.getters.shopUsers[event.uid];
      if (event.customerName) {
        return event.customerName;
      } else if (shopUser) {
        return shopUser.username;
      } else {
        return false;
      }
    },

    getEventTime(day) {
      const hours = addLeadingZero(new Date(day.timestamp).getHours());
      const minutes = addLeadingZero(new Date(day.timestamp).getMinutes());
      return `${hours}:${minutes}`;
    },

    getWeekDay(day) {
      const newDate = new Date(day.dayTimeStamp);
      const weekdayItem = dateToWeekday(newDate, weekdays);
      return `${weekdayItem.day.shortname}`;
    },

    getDate(day) {
      const newDate = new Date(day.dayTimeStamp);  
      return `${newDate.getDate()}.${newDate.getMonth() + 1}`;
    },

    getUsers(userIDs) {
      const _this = this;
      let shopUsers = {};

      const shopUserPromises = userIDs.map((key) => {
        return this.$firebase.database().ref('users').child(key).once('value');
      });

      Promise.all(shopUserPromises).then((snapshots) => {
        snapshots.forEach((snapshot) => {
          shopUsers[snapshot.key] = snapshot.val();
        });
        _this.$store.dispatch('updateShopUsers', shopUsers);
      }).catch((error) => {
        console.log(error);
      });
    },

    getEvents(startDate,endDate) {
      const _this = this;
      const userIDs = [];
      
      this.$store.dispatch('updateIsLoading', true);
      
      const eventsDatabase = this.$firebase.database().ref('events').orderByChild('dayTimeStamp').startAt(startDate).endAt(endDate);
      try {
        eventsDatabase.on('value', (snapshot) => {
          let events = [];
          
          if (snapshot.val()) {
            const shopEvents = snapshot.val();
            for (let key in shopEvents) {
              let thisEvent = shopEvents[key];
              thisEvent.key = key
              events.push(thisEvent);
              if (userIDs.indexOf(thisEvent.uid) == -1) { userIDs.push(thisEvent.uid); }
            }
            
            events = sortArray('ascending', events, 'timestamp');
            events = sortArray('ascending', events, 'dayTimeStamp');

            events = sortEventDaysArray(events);
            _this.getUsers(userIDs);
          } else {
            console.log('Keine Termine gespeichert');
          }

          _this.$store.dispatch('updateShopEvents', events);
          _this.$store.dispatch('updateIsLoading', false);    
          
        });
      }
      catch(err) {
        console.log('Konnte keine events abrufen');
        this.$store.dispatch('updateIsLoading', false);
      }
      
    }

  },
  mounted() {
    let startDate = new Date();
    startDate.setHours(0,0,0,0);
    startDate = startDate.getTime();
    // show days (stored in global vars)
    const endDate = startDate + (1000*60*60*24 * this.$variables.admin.events.daysToShow);
    this.getEvents(startDate,endDate);   

  }
}
</script>


<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .cal {
    width: 100%;
    overflow: scroll;
    display: flex;
    font-size: 13px;
  }

  .cal button.remove {
    top: 0;
    right: 0;
  }
  
  .day {
    width: 220px;
    flex: 0 0 auto;
  }

  .day-info {
    margin-bottom: 35px;
    h4 {
      margin-bottom: 0;
    }
  } 

  .day + .day {
    margin-left: 5px;
  }

  .event {
    position: relative;
    padding-top: 10px;
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: -10px;
      left: 0;
      background: $color5;
    }
  }
  
  .event + .event {
    margin-top: 40px;
    
  }

  li + li{
    margin-top: 5px;
  } 

  .time {
    font-weight: bold;
    font-size: 20px;
  }

  .title {
    //display: block;
    font-weight: bold;
    color: $color6;
  }

  h3 {
    margin-bottom: 0;
    font-size: 25px;
    line-height: 1.1;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .overlay /deep/  .overlay__inner {
    .action {
      display: flex;
      button {
        width: 20%;
      }
      button + button {
        margin-left: 20px;
      }
    }

    

    
  }

  .add-item button {
    margin-left: auto
  }
</style>