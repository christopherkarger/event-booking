export default (method, arr, item) => {
  arr.sort((a,b) => {
    
    if (item) {
      if (method == 'ascending') {
        return a[item] - b[item];
      }

      if (method == 'descending') {
        return b[item] - a[item];
      }
    }

  });
  return arr;
}