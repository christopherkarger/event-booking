export default(date, weekdays) => {
  let index = date.getDay() - 1;
  if (index === -1) { index = (weekdays.length - 1); }
  return {
    index,
    day: weekdays[index]
  };
}