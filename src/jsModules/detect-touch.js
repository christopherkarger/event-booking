export default () => {
  const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
  window.$touchDevice = isTouch;
  const featureClass = (isTouch) ? 'touch-events' : 'no-touch-events';
  document.querySelector('body').classList.add(featureClass);
}