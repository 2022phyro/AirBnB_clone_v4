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
});
