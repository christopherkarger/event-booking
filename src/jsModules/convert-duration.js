export default(payload) => {
  const time = parseInt(payload.duration.hours) + (parseInt(payload.duration.minutes) / 60);
  const oneMinute = (1000 * 60);
  const oneHour = (oneMinute * 60);
  const milliSeconds = parseFloat(time) * oneHour;

  if (payload.inString) {
    const hours = Math.floor(milliSeconds / oneHour);
    const minutesInMilli = milliSeconds - (hours * oneHour); 
    const minutes =  Math.floor(minutesInMilli / oneMinute);
    let durationString = '';

    if (hours > 0) {
      durationString += hours + ' ';
      if (hours > 1) {
        durationString += 'hours';
      } else {
        durationString += 'hour';
      }
    }
    
    if (minutes > 0) {
      durationString += ' ' + minutes + ' ';
      if (minutes > 1) {
        durationString += 'minutes';
      } else {
        durationString += 'minute';
      }
    }

    return durationString;
  } else {
    return milliSeconds;
  }
}