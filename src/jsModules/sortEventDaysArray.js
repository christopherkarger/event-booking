export default (arr) => {
  let daySortedEvents = [];
  let dayTimeStamp;
  let newDay = [];
  arr.forEach((event,index) => {
    if (index === 0) {
      newDay.push(event);
    } else {
      if (dayTimeStamp !== event.dayTimeStamp) {
        daySortedEvents.push(newDay);
        newDay = [event];
      } else {
        newDay.push(event);
      }
    }
    
    if (index === (arr.length - 1)) {
      daySortedEvents.push(newDay);
    }
    
    dayTimeStamp = event.dayTimeStamp;
  });

  return daySortedEvents;
}