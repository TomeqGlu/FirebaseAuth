


//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ' ,user); 
    
    // get data
    db.collection('reviews').onSnapshot(snapshot => {
      setupReviews(snapshot.docs);
      setupUI(user);
    }, err => {
      console.log(err.message);
    });
  } else {
    console.log('user logged out');
    setupUI(); //If there is nothing if statement in setupUi wil be false
    setupReviews([]);
  }
});

//create new review
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('reviews').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    //close modal on reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  })
})

// signup
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm['signup-email'].value;  
  const password = signupForm['signup-password'].value;

  console.log(email, password);

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });    
  }).then(() => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
  // line above will take smoe time to execute, that's why i added a promise
})

// loguot
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();  
});

// login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value; 

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //close modal and rest the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
})