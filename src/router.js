import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/user/Home.vue'
import store from './store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/email',
      name: 'email',
      component: () => import('./views/user/Email.vue'),
      redirect: 'email/login',
      children: [
        {
          path: 'login',
          name: 'email-login',
          component: () => import('./views/user/email/Login.vue'),
          meta: { backPath: '/' }
        },
        {
          path: 'register',
          name: 'email-register',
          component: () => import('./views/user/email/Register.vue'),
          meta: { backPath: '/email/login' }
        },
        {
          path: 'reset',
          name: 'email-reset',
          component: () => import('./views/user/email/Reset.vue'),
          meta: { backPath: '/email/login' }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/admin/Main.vue'),
      children: [
        {
          path: 'home',
          component: () => import('./views/admin/Home.vue')
        },
        {
          path: 'shop',
          component: () => import('./views/admin/Shop.vue')
        },
        {
          path: 'employees', 
          component: () => import('./views/admin/Employees.vue')
        },
        {
          path: 'services',      
          component: () => import('./views/admin/Services.vue')
        },
        {
          path: 'events',      
          component: () => import('./views/admin/Events.vue'),
          children: [
            {
              path: 'new-event', 
              component: () => import('./views/admin/newEvent/NewEvent.vue'),
              redirect: 'new-event/services',
              children: [
                {
                  path: 'services', 
                  component: () => import('./views/admin/newEvent/Services.vue')
                },
                {
                  path: 'employees', 
                  component: () => import('./views/admin/newEvent/Employees.vue'),
                  meta: { backPath: '/services' }
                },
                {
                  path: 'date', 
                  component: () => import('./views/admin/newEvent/Date.vue'),
                  meta: { backPath: '/employees' }
                },
                {
                  path: 'info', 
                  component: () => import('./views/admin/newEvent/CustomerInfo.vue'),
                  meta: { backPath: '/date' }
                },
                {
                  path: 'overview', 
                  component: () => import('./views/admin/newEvent/Overview.vue'),
                  meta: { backPath: '/info' }
                },
                {
                  path: 'confirmation', 
                  component: () => import('./views/admin/newEvent/Confirmation.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'holiday',      
          component: () => import('./views/admin/Holiday.vue')
        },
      ]
    },
    {
      path: '/welcome', 
      component: () => import('./views/user/Welcome.vue')
    },
    {
      path: '/about', 
      component: () => import('./views/user/About.vue'),
      meta: { backPath: '/welcome' }
    },
    {
      path: '/events', 
      component: () => import('./views/user/Events.vue'),
      meta: { backPath: '/welcome' }
    },
    {
      path: '/services', 
      component: () => import('./views/user/Services.vue'),
      meta: { backPath: '/welcome' }
    },
    {
      path: '/employees', 
      component: () => import('./views/user/Employees.vue'),
      meta: { backPath: '/services' }
    },
    {
      path: '/date',
      component: () => import('./views/user/Date.vue'),
      meta: { backPath: '/employees' }
    },
    {
      path: '/info',
      component: () => import('./views/user/CustomerInfo.vue'),
      meta: { backPath: '/date' }
    },
    {
      path: '/overview',
      component: () => import('./views/user/Overview.vue'),
      meta: { 
        backPath: '/info', 
        skipBackPathTo: '/date' 
      }
    },
    {
      path: '/confirmation',
      component: () => import('./views/user/Confirmation.vue'),
      meta: { backPath: '/welcome' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAdminLoginPage = to.name == 'admin';
  const isChildOfAdminPage = to.fullPath.indexOf('/admin/') > -1;
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (to.name === 'home') {
    if (isLoggedIn) {
      if (isAdmin) {
        next({ path: '/admin/home' });
      } else {
        next({ path: '/welcome' });
      }  
    } else {
      next();
    }

  } else if (to.name === 'email' || 
             to.name === 'email-login' || 
             to.name === 'email-register' || 
             to.name === 'email-reset') {
    if (!isLoggedIn) {
      next();
    }
  } else if (isAdminLoginPage || isChildOfAdminPage) {
    
    if (isChildOfAdminPage && !isLoggedIn) {
      next({ path: '/admin'});
    }

    if (isAdminLoginPage && isAdmin && isLoggedIn) {
      next({ path: '/admin/home'});
    }
    
    if ( (isAdminLoginPage && !isLoggedIn) ||
       (isChildOfAdminPage && isAdmin && isLoggedIn) ) {
      next();
    }

  } else {
    if (isLoggedIn) {
      next();
    } else {
      next({ path: '/'});
    }
  }  

});


export default router;
