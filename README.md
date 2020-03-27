# FirebaseAuth
simple HTML form created to test Firebase authentication

To run this project please make your own firebase project in less than 5 minutes!
Dont forget to add yor own unique data to index.thml within tags <script> in object "firebaseConfig" from your own firebase project.

// Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      appId: "",
      measurementId: ""
    };
    
Please replace old rules in your's firebase project (You can find this in your project's console in tab Database/rules)

service cloud.firestore {
  match /databases/{database}/documents {
   
    match /users/{userId} {
    	allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }
    
    match /reviews/{reviewID} {
    	allow read : if request.auth.uid != null;
      allow write : if request.auth.token.admin == true;
    }
  }
}
