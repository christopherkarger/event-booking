import firebase from '@/jsModules/firebase';
import store from '@/store';

export default (startDate) => {
  const getters = store.getters;
  const employeeName = getters.selectedEmployee.name;
  const events = firebase.database().ref('events');


  return new Promise((resolve) => {
    events.orderByChild('timestamp')
    .startAt(startDate.getTime())
    .endAt(startDate.getTime() + (1000*60*60*24))
    .once('value', (snapshot) => {
      const snapshotVal = snapshot.val();
      if (snapshotVal) {
        const employeeEvents = {};
        // iterate through all future events
        for (let key in snapshotVal) {
          // save event if employee name fits
          if (snapshotVal[key].employee === employeeName) {
            employeeEvents[key] = snapshotVal[key];
          }
        }
        // if events are more than 0
        if (Object.keys(employeeEvents).length > 0) {
          resolve(employeeEvents);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  });
};