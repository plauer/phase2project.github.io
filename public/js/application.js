$(document).ready(function() {
    function bindEvents() {
      $(".search_parameters").on('click', "input[value='See Connections']", findResults)
  }
});



var findResults = function(event) {
  event.preventDefault();

  var ajaxRequest = $.ajax({
    url: $(this).attr('action'),
    type:'post',
    data: $('form').serialize()
  });

  ajaxRequest.done (function(data) {
    console.log(data);

  });



}


// $(".search_parameters").on('click', "input[value='See Connections']", findResults)
