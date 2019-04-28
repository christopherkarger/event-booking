import holidays from '@/jsModules/holidays';
import dates from '@/jsModules/dates';
import store from '@/store';

const isNowClosed = (day) => {
  const openingHours = store.getters.shopDays;
  const times = openingHours[day.index].times;

  if (times.length > 0) {
    const timeBlock = times[times.length - 1];
    const closing = timeBlock[timeBlock.length - 1].split(':');
    const now = new Date();
    const closingTime = new Date();
    const hours = parseInt(closing[0]);
    const minutes = parseInt(closing[1]);
    closingTime.setHours(hours,minutes,0,0);
    return now.getTime() > closingTime.getTime();
  } else {
    return false;
  }
  
};

const checkIfDayIsHoliday = (date) => {
  const thisDay = `${date.getDate()}.${(date.getMonth() + 1)}`;
  const thisYearHolidays = holidays[new Date().getFullYear()];
  return thisYearHolidays.days.indexOf(thisDay) > -1;
};

const checkIfShopHoliday = (allDayEmployeeShopHolidays, timeStamp) => {
  const dayNotAvailable = allDayEmployeeShopHolidays.filter((elm) => {
    return timeStamp == elm.startDate  
           || (timeStamp > elm.startDate && timeStamp <= elm.endDate);
  });
  
  return dayNotAvailable.length > 0;
};

const getOpeningHours = async (scope) => {
  return new Promise((resolve) => {
    store.dispatch('updateShopDays', scope).then(() => {
      resolve();
    }); 
  });
};


export default async (scope) => {

  await getOpeningHours(scope);
  await store.dispatch('updateShopHolidays', {scope: scope, onlyFuture: true});
  const allDates = dates();
  let allDayEmployeeHolidays = [];
  
  // get opening hours of shop
  const openingHours = store.getters.shopDays;

  // get holidays of employee
  const employeeHolidays = store.getters.employeeHolidays;
  
  // get allDay holidays of employee
  if (employeeHolidays.length > 0) {
    allDayEmployeeHolidays = employeeHolidays.filter(elm => elm.allDayEvent);
  }
  
  // Check if now is closed
  if (isNowClosed(allDates[0])) { allDates[0].closed = true; }
  
  allDates.forEach((date) => {
    if (openingHours[date.index].times.length === 0) { date.closed = true; }

    // Check if calender holiday
    if (checkIfDayIsHoliday(date.date)) { date.closed = true; }

    // Check if Shop Holiday of employee
    if (allDayEmployeeHolidays.length > 0) {
      if (checkIfShopHoliday(allDayEmployeeHolidays, date.timeStamp)) { date.closed = true; }
    }
    
  });

  return new Promise((resolve) => {
    resolve(allDates);
  });

}