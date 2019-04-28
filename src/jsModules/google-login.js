function loadGoogleAPI() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api:client.js';
  document.head.appendChild(script);
  
  return new Promise(resolve => {
    script.onload = () => {
      resolve('Script Loaded');
    }
  });
}

async function googleInit(callbackFunc) {
  let auth2;
  await loadGoogleAPI();

  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '303275278684-79qj56v5inphpl0e2doljnpr799fkbg1.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin'
    });

    //https://developers.google.com/identity/sign-in/web/reference

    auth2.isSignedIn.listen(() => {
      const googleUser = auth2.currentUser.get();
      callbackFunc({
        googleUser,
        isLoggedIn: auth2.isSignedIn.get()
      });
    });

  });

}

const googleLogin = (callbackFunc) => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signIn().then((googleUser) => {
    callbackFunc(googleUser);
  }, (response) => {
    console.log(response.error);
  });
} 

const googleLogout = (callbackFunc) => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signOut().then(() => {
    callbackFunc();
  });
} 

export {
  googleInit,
  googleLogin,
  googleLogout
}