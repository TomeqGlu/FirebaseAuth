const reviewsList = document.querySelector('.reviews');

// setup reviews
const setupReviews = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const reviews = doc.data();
      //console.log(reviews);
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${reviews.tittle}</div>
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