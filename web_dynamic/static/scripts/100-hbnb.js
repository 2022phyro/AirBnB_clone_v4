$('document').ready(function () {
  const val = {};
  $('.amenities input[type="checkbox"]').change(function () {
    if (this.checked) {
      val[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      if (val[$(this).attr('data-id')]) {
        delete val[$(this).attr('data-id')];
      }
    }
    let result = Object.values(val);
    result = result.join(', ');
    $('.amenities h4').text(result);
  });
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('header div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  });
  function fetch (_data) {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(_data),
      success: function (response) {
        $('.places').html('<ul></ul>');
        /* console.log(response); */
        response.forEach(function (place) {
          $('.places ul').append(`
        <li>
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">
                $${place.price_by_night}
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
             </div>
             <div class="number_rooms">
               ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
             </div>
             <div class="number_bathrooms">
               ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
             </div>
           </div>
           <div class="user">
             <b>Owner:</b> ${place.owner}
           </div>
           <div class="description">
             ${place.description}
           </div>
         </article>
       </li>
        `);
        });
      }
    });
  }
  fetch({});
  $('button').on('click', function (event) {
    const names = $('.amenities h4').text().split(', ');
    const amen = [];
    const state = [];
    const city = [];
    $('.locations h2 input[type="checkbox"]:first-child').each(function () {
      if (this.checked) {
        state.push($(this).attr('data-id'));
      }
    });
    $('.locations .popover ul li ul li input[type="checkbox"]:first-child').each(function () {
      if (this.checked) {
        city.push($(this).attr('data-id'));
      }
    });
    $('.amenities input[type="checkbox"]').each(function () {
      if (this.checked) {
        amen.push($(this).attr('data-id'));
      }
    });
    const search = { amenities: amen, states: state, cities: city };
    /* console.log(search); */
    fetch(search);
  });
});
