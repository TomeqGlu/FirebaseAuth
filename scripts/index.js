const reviewsList = document.querySelector('.reviews');

// setup reviews
const setupReviews = (data) => {

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

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});