import store from '@/store';

export default (payload) => {
  
  let blocked = false;
  let endDate = false;
  const employeeHolidays = store.getters.employeeHolidays;


  employeeHolidays.forEach(holiday => {
    
    if (payload.start === holiday.startDate
      || payload.start > holiday.startDate && payload.start < holiday.endDate
      || holiday.startDate > payload.start && holiday.startDate < payload.end) {
      blocked = true;
      endDate = holiday.endDate;
    }

  });
  return {
    endDate,
    blocked
  };
};