# Event booking app
An event booking app build with VueJs and firebase.
Build it with npm run build, replace the firebase config in jsModules/firebase with your config
and host wherever you want. You can reach the the admin dashboard with /admin. 

Feel free to modify the code or use it for commercial purpose.

Cya
Happy Coding

## Screenshots App
![Alt text](screens/app/1.png?raw=true "Screenshot 1")
![Alt text](screens/app/2.png?raw=true "Screenshot 2")
![Alt text](screens/app/3.png?raw=true "Screenshot 3")
![Alt text](screens/app/4.png?raw=true "Screenshot 4")
![Alt text](screens/app/5.png?raw=true "Screenshot 5")
![Alt text](screens/app/6.png?raw=true "Screenshot 6")


## Screenshots Admin
![Alt text](screens/admin/1.png?raw=true "Screenshot 1")
![Alt text](screens/admin/2.png?raw=true "Screenshot 2")
![Alt text](screens/admin/3.png?raw=true "Screenshot 3")
![Alt text](screens/admin/4.png?raw=true "Screenshot 4")
![Alt text](screens/admin/5.png?raw=true "Screenshot 5")
![Alt text](screens/admin/6.png?raw=true "Screenshot 6")


## firebase rules

```json
{
  "rules": {
    "users": {
      ".read": "auth.uid === '[YOUR ADMIN ID]'",
      ".write": "auth.uid === '[YOUR ADMIN ID]'",
        
      "$uid": {
        ".read": "$uid === auth.uid || $uid === '[YOUR ADMIN ID]'",
        ".write": "$uid === auth.uid"
      }
    },
    
    "events": {
      ".read": "auth !== null",
      ".write": true,
      ".indexOn": ["dayTimeStamp", "timestamp", "employee", "uid"]
    },
      
    "isAdmin": {
      ".read": "auth.uid === '[YOUR ADMIN ID]'",
      ".write": "auth.uid === '[YOUR ADMIN ID]'"
    },
      
    "shop": {
      ".read": true,
      ".write": "auth.uid === '[YOUR ADMIN ID]'",
      "holidays": {
        ".indexOn": ["endDate"]
      }
      
    }
    
  }
}
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
