<template>
  <div>
    <div class="add-item">
      <appButton @buttonClick="addEmployee">Add employee</appButton>
    </div>
    
    <h2>Employee</h2>
    <div class="grid">
      <div class="no-items-added" v-if="employees.length == 0"><p>Please add employees</p></div> 

      <div class="block delete-able employee" v-for="(employee, employeeIndex) in employees" :key="employeeIndex">
        <input class="name" type="text" placeholder="Name of employee" v-model="employee.name" :class="{'error': hasError(employeeIndex, employee.name) }" />  
        
        <h3>Picture</h3>
        <imageCropper @changedImage="saveImage" :index="employeeIndex" :pic="employee.profilImage ? employee.profilImage.src : null"/>

        <div class="times-control-wrapper">
          <div class="works-as-open">
            <input type="checkbox" :id="'employee' + employeeIndex"  value="true" v-model="employee.worksAsOpen" @change="toggleShowTimes(employeeIndex, {asOpen: employee.worksAsOpen})">
            <label :for="'employee' + employeeIndex">Service times like opening hours</label>
          </div>
  
          <button class="toggle-times" :class="{'open' : hideOrShowTimes[employeeIndex]}" @click="toggleShowTimes(employeeIndex)"><span>Toggle opening hours</span></button>
        </div>

        <div class="employee-times" :class="{'disabled': employee.worksAsOpen, 'hidden' : !hideOrShowTimes[employeeIndex]}">
          <div class="day" v-for="(day, dayIndex) in employee.days" :key="dayIndex">
            <h3>{{ day.name }}</h3>

            <div class="time-block" v-for="(time, timeIndex) in day.times" :key="timeIndex">         
             
              <timePicker 
                v-for="(timeItem, timeItemIndex) in time" 
                :key="timeItemIndex" 
                @timeUpdate="updateTime({employeeIndex, dayIndex, timeIndex, timeItemIndex}, $event)" 
                :time="timeItem"/>

              <xButton @xbuttonClick="removeEmployeeTime(employeeIndex, dayIndex, timeIndex)" />
            </div>
           <appButton @buttonClick="addEmployeeTime(employeeIndex, dayIndex)">Add time</appButton>
          </div>
        </div>
        <xButton @xbuttonClick="deleteEmployee(employeeIndex)" />
      </div>
      
    </div>
  
    
    <div class="bottom-fixed">
      <appButton @buttonClick="update">Save</appButton>
    </div>
  </div>
</template>

<script>
  import weekdays from '@/jsModules/days';
  import randomString from '@/jsModules/random-string';
  import validateInputs from '@/mixins/validateInputs';
  import scrollTo from '@/mixins/scrollTo';
  import timePicker from '@/components/TimePicker';
  import addLeadingZero from '@/jsModules/add-leading-zero';
  import imageCropper from '@/components/ImageCropper';
  import xButton from '@/components/XButton';
  import appButton from '@/components/Button';
  
  export default {
    data() {
      return {
        profilImages: [],
        allProfileImages: []
      }
    },
    computed: {
      employees() {
        return this.$store.getters.employees;
      },
      
      hideOrShowTimes() {
        return [];
      }
    },
    components: {
      timePicker,
      imageCropper,
      xButton,
      appButton
    },
    methods: {
      toggleShowTimes(index, payload) {
        if (payload) {
          this.hideOrShowTimes[index] = !payload.asOpen;
        } else {
          if (typeof this.hideOrShowTimes[index] === 'undefined') {
            this.hideOrShowTimes[index] = true;
          } else {
            this.hideOrShowTimes[index] = !this.hideOrShowTimes[index];
          }
        }
      
        this.$forceUpdate();
      },
      updateTime(payload, newTime) {
        const shopEmployees = JSON.parse(JSON.stringify(this.$store.getters.employees));
        shopEmployees[payload.employeeIndex].days[payload.dayIndex].times[payload.timeIndex][payload.timeItemIndex] = `${addLeadingZero(newTime.hours)}:${addLeadingZero(newTime.minutes)}`;
        this.$store.dispatch('updateLocalEmployees', shopEmployees);
      },

      saveImage(payload) {
        const shopEmployees = JSON.parse(JSON.stringify(this.$store.getters.employees));
        let fileName = this.employees[payload.index].name
                           .trim()
                          .replace(' ', '-')
                          .toLowerCase();

        fileName += `.${payload.fileExt}`; 
        this.profilImages[payload.index] = { base64: payload.base64 };
        shopEmployees[payload.index].profilImage = { fileName };
        this.$store.dispatch('updateLocalEmployees', shopEmployees);

      },
      
      getProfileImages() {
        const _this = this;
        const shopEmployees = this.$store.getters.employees;
        const storageRef = this.$firebase.storage().ref();
        const promises = [];
        const allProfileImages = [];
        shopEmployees.forEach((elm,index) => {
          if (elm.profilImage) {
            promises.push(storageRef.child(`profilimages/${elm.profilImage.fileName}`).getDownloadURL().then((url) => {
              allProfileImages[index] = url;
              //_this.allProfileImages[index] = url;
            }));
          }
        });

        Promise.all(promises).then(() => {
          _this.allProfileImages = allProfileImages;
        });
      },

      async getProfileImageUrls() {
        return new Promise((resolve,reject) => {
          const _this = this;
          const shopEmployees = this.$store.getters.employees;
          const storageRef = this.$firebase.storage().ref();
          const promises = [];
          const allProfileImages = [];
          
          if (this.profilImages.length > 0) {

            shopEmployees.forEach((elm,index) => {
              if (elm.profilImage) {
                promises.push(storageRef.child(`profilimages/${elm.profilImage.fileName}`).getDownloadURL().then((url) => {
                  allProfileImages[index] = url;
                }).catch((error) => {
                  console.log(error); 
                  reject(); 
                }));
              }
            });

            Promise.all(promises).then(() => { resolve(allProfileImages); });

          } else {
            resolve(allProfileImages);
          }

        });
      },

      async saveProfileImages() {
        return new Promise((resolve,reject) => {
          const shopEmployees = this.$store.getters.employees;
          const storageRef = this.$firebase.storage().ref();
          const promises = [];

          if (this.profilImages.length > 0) {
            this.profilImages.forEach((elm, index) => {
              const file = shopEmployees[index].profilImage.fileName;
              const imagesRef = storageRef.child(`profilimages/${file}`);     
              promises.push(imagesRef.putString(elm.base64, 'data_url'));
            });
            
            Promise.all(promises).then(() => { resolve(); });

          } else {
            resolve();
          }
        });
      },

      async update() {
        const _this = this;
        const shopEmployees = JSON.parse(JSON.stringify(this.$store.getters.employees));
        const hasError = this.validateInputs(this.employees, ['name']);
        if (hasError) { return; }

        this.$store.dispatch('updateIsLoading', true);

        // Save all images
        await this.saveProfileImages();
        
        // Get image Urls and save to store
        const profileImageUrls = await this.getProfileImageUrls();   
        profileImageUrls.forEach((src, index) => {
          shopEmployees[index].profilImage.src = src; 
        });
        this.$store.dispatch('updateLocalEmployees', shopEmployees);
        
        const shopEmployeesDatabase = this.$firebase.database().ref('shop/employees');
        shopEmployeesDatabase.set(shopEmployees).finally(() => {
          _this.$store.dispatch('updateIsLoading', false);
        });     
        
      },
      
      addEmployee() {
        this.$store.dispatch('addEmployee', { 
          name: '',
          days: weekdays,
          id: randomString(),
          worksAsOpen: true
        });
        this.scrollTo('.employee');
      },

      deleteEmployee(employeeIndex) {
        this.removeError(employeeIndex);
        this.employees.splice(employeeIndex, 1);
      },

      addEmployeeTime(employeeIndex, dayIndex) {
        this.$store.dispatch('addEmployeeTime', { 
          dayIndex,
          employeeIndex, 
          time: ['00:00', '00:00']
        });
      },

      removeEmployeeTime(employeeIndex, employeeDayIndex, employeeTimeIndex) {
        this.$store.dispatch('removeEmployeeTime', { employeeIndex, employeeDayIndex, employeeTimeIndex});
      }
    },
    mounted() {  
      this.$store.dispatch('updateEmployees', this).then(() => {
        this.$store.dispatch('updateIsLoading', false);
        //this.getProfileImages();
      });
    },
    mixins: [validateInputs, scrollTo]
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  
  .grid{
    @extend %grid;
  }

  .disabled {
    opacity: .5;
    pointer-events: none;
  }

  .day,
  .works-as-open {
    margin-bottom: 20px;
  }

  .works-as-open label {
    width: calc(100% - 80px);
  }
  
  .day + .day {
    border-top: 1px solid $color3;
    padding-top: 20px;
  }

  .employee {
    align-self: flex-start;	
  }

  input.name {
    font-weight: bold;
  }

  .employee ,
  .employee-time {
    position: relative;
    margin-bottom: 20px;
  }
  
  .employee-time {
    max-width: 300px;
    display: flex;
  }

  .add-item button {
    margin-left: auto
  }

  .employee-times {
    &.hidden {
     display: none;
    }
  }

  .times-control-wrapper {
    position: relative;
  }

  .toggle-times {
    @extend %icon;
    width: 20px;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 8px;
    right: 10px;
    transition: transform .2s ease;
    &.open {
      transform: rotate(180deg);
    }
    //background: red;
    &:after {
      content: '\f078';
    }
    span {
      display: none;
    }

  }

</style>