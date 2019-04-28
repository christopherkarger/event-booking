import weekdays from './days';
import globals from '../global-variables';
import dateToWeekday from '@/jsModules/date-to-weekday';

export default () => {
  const days = []; 
    
  for (let i = 0; i < globals.daysToBook; i++) {
    let date = new Date();
    let newDate = new Date(date.setDate(date.getDate()+ i));
    newDate.setHours(0,0,0,0);
    const weekdayItem = dateToWeekday(newDate, weekdays);

    days.push({
      date: newDate,
      weekname: weekdayItem.day.name,
      shortname: weekdayItem.day.shortname,
      index: weekdayItem.index,
      timeStamp: newDate.getTime()
    });   
  }
  
  return days;

}