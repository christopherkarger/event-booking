function loadFacebookAPI() {
  var script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/sdk.js';
  document.head.appendChild(script);
  
  return new Promise(resolve => {
    script.onload = () => {
      resolve('Script Loaded');
    }
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '577139899355643',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.1'
  });
  
  FB.AppEvents.logPageView();   
    
};
let interVal;

async function facebookInit(callbackFunc) { 
  await loadFacebookAPI();
  
  interVal = setInterval(function() {
    if (FB.getLoginStatus) {
      clearInterval(interVal);
      FB.getLoginStatus(function(response) {
        //console.log('Facebook', response);
        if (response.status == 'connected') {
          callbackFunc(response);
        }
      }, true);
    }
  }, 10 );
  
}




export default facebookInit; 
