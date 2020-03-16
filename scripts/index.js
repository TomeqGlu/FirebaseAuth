const reviewsList = document.querySelector('.reviews');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loogedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    //toggle UI elemnts
    loogedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //toogle UI elements
    loogedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// setup reviews
const setupReviews = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const reviews = doc.data();
      //console.log(reviews);
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${reviews.title}</div>
          <div class="collapsible-body white">${reviews.content}</div>
        </li>
      `;
      html += li
    });

    reviewsList.innerHTML = html;
  } else {
    reviewsList.innerHTML = `<h5 class="center-align">Login to view reviews</h5>`;
  } 

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});