import isTimeIsBlockedForHoliday from '@/jsModules/core/isTimeIsBlockedForHoliday';
import serviceFitsInFreeTimeBlock from '@/jsModules/core/serviceFitsInFreeTimeBlock';

export default (start,end,serviceTime,blockedTimes,ignoreEvent) => {
  
  const possibletimes = [];
  const now = new Date().getTime();

  if ((start + serviceTime) <= end) {

    // While starttime is lower or equal to endtime
    while (start <= end) {
      let isPossible = true;
      let blockedEventEnd;
      let freeTimeBlockStartTimes = false;
      let isTimeBlockedForHoliday = null;

      if ((start + serviceTime) <= end) {
        for (let key in blockedTimes) {
          const event = blockedTimes[key];
          const eventStart = parseInt(event.timestamp);
          const eventEnd = parseInt(event.timestampEnd);

          if (eventStart !== ignoreEvent) {
            // Is start an already taken event OR
            // Is event + duration bigger than taken event AND starttime is smaller than eventEnd
            if (start === eventStart || 
              ((start + serviceTime) > eventStart) && start < eventEnd) {
              
              // Save Endtime of blockedEvent only once
              if (isPossible) { blockedEventEnd = eventEnd; }
              isPossible = false;
            }

            // FreeTimeBlock
            // If time is not possible, event has free time block and 
            // checked possible free time is false
            // otherwise it would be overwritten
            if (!isPossible && event.freeTimeBlock && !freeTimeBlockStartTimes) {
              freeTimeBlockStartTimes = serviceFitsInFreeTimeBlock({event, start, serviceTime, blockedTimes});
            }
          }
        }   
        
        isTimeBlockedForHoliday = isTimeIsBlockedForHoliday({
          start: start,
          end: start+ serviceTime 
        });
        
        if (isTimeBlockedForHoliday.blocked) { isPossible = false; }

        // If dateStart is already expired
        if (start < now) { isPossible = false; }

        if (isPossible) {
          possibletimes.push(new Date(start)); 
        } else if (freeTimeBlockStartTimes) {
          freeTimeBlockStartTimes.forEach(time => {
            let blockedForHoliday = false; 
            const startTimeStamp = time.getTime();
            blockedForHoliday = isTimeIsBlockedForHoliday({
              start: startTimeStamp,
              end: startTimeStamp + serviceTime
            });

            if (startTimeStamp  == 1553166000000) {
              console.log(new Date(startTimeStamp))
              console.log(new Date (startTimeStamp + serviceTime));
          }

            if (!blockedForHoliday.blocked) { possibletimes.push(time);  }
          });
        }
      }

      
      // If time is not possible, push end time of event
      if (isPossible) {
        start = start + serviceTime;
      } else {
        if (isTimeBlockedForHoliday.blocked) {
          start = isTimeBlockedForHoliday.endDate;
        } else {
          start = blockedEventEnd;  
        }
      }
    }

  }

  return possibletimes;

}