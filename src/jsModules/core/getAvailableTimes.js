import convertDuration from '@/jsModules/convert-duration';
import store from '@/store';
import _core_getPossibleTimes from '@/jsModules/core/_core_getPossibleTimes';
import getBlockedTimes from '@/jsModules/core/getBlockedTimes';

export default async () => {

  const getters = store.getters;
  const employee = getters.employees[getters.selectedEmployee.index];
  const serviceID = getters.selectedService.index;
  const selectedDate = getters.selectedDate;
  let selectedDateIndex = selectedDate.weekindex;
  const service = getters.services[serviceID];
  let dayOfEmployee = employee.days[selectedDateIndex];
  const blockedTimes = await getBlockedTimes(selectedDate.date);
  let possibleTimes = null;
  
  if (employee.worksAsOpen) {
    dayOfEmployee = getters.shopDays[selectedDateIndex];
  }
  
  // If employee is working
  if (dayOfEmployee.times && dayOfEmployee.times.length > 0) {
     
    dayOfEmployee.times.forEach((time) => {
      const startTime = time[0].split(':');
      const endTime = time[1].split(':');
      const dateStart = new Date(selectedDate.date.getTime());
      const dateEnd = new Date(selectedDate.date.getTime());

      dateStart.setHours(parseInt(startTime[0]), parseInt(startTime[1]), 0 , 0);
      dateEnd.setHours(parseInt(endTime[0]), parseInt(endTime[1]), 0, 0);
      
      // convert duration of service in milliseconds
      const serviceTime = convertDuration({
        duration: service.duration
      });

      let start = dateStart.getTime();
      let end = dateEnd.getTime();
      
      possibleTimes = _core_getPossibleTimes(start,end,serviceTime,blockedTimes);

    });
  }

  return new Promise((resolve) => {
    resolve(possibleTimes)
  });

};