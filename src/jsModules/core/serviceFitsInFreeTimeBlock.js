import convertDuration from '@/jsModules/convert-duration';
import _core_getPossibleTimes from '@/jsModules/core/_core_getPossibleTimes';

export default(payload) => {
  const event = payload.event;
  const freeTimeBlock = event.freeTimeBlock;
  const serviceTime = payload.serviceTime;
  const blockedTimes = payload.blockedTimes;
  const startInMillisec = convertDuration({ duration: freeTimeBlock.start });
  const durationInMillisec = convertDuration({ duration: freeTimeBlock.duration });
  const start = payload.start + startInMillisec;
  const end = start + durationInMillisec;
  const ignoreEvent = payload.start;
  
  const possbileTimes = _core_getPossibleTimes(start,end,serviceTime,blockedTimes,ignoreEvent);
  
  return possbileTimes;

}