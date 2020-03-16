


//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //console.log('user logged in: ' ,user); 
    
    // get data
    db.collection('reviews').get().then(snapshot => {
      setupReviews(snapshot.docs);
      setupUI(user);
    })
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
  console.log(createForm);
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
const singupForm = document.querySelector('#signup-form');

singupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = singupForm['signup-email'].value;  
  const password = singupForm['signup-password'].value;

  console.log(email, password);

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    singupForm.reset();
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