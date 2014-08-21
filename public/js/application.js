$(document).ready(function() {
    function bindEvents() {
      // $(".search_parameters").on('click', "input[value='See Connections']", findResults)
      $(".search_template").on('click', '.industry', findIndustries);
      $(".search_template").on('click', '.location', findLocations);
  }


  var findIndustries = function(event) {
    event.preventDefault();
    $(this).css({
        'background-color': 'blue',
        'color' : 'white',
        'font-weight' : 'bold',
      });

    var ajaxRequest = $.ajax({
      type: 'post',
      url: '/industries',
      data: $(this).attr('value')
    });

    ajaxRequest.done( function(data) {
      for (var i = 0; i < data.length; i++) {
        var result_item = $('#results .item').clone().appendTo('#results');
        $()


      }
      console.log(data);
    })
  };



bindEvents();

});



// var findResults = function(event) {
//   event.preventDefault();

//   var ajaxRequest = $.ajax({
//     url: $(this).attr('action'),
//     type:'post',
//     data: $('form').serialize()
//   });

//   ajaxRequest.done (function(data) {
//     console.log(data);

//   });


