$(document).ready(function() {
    function bindEvents() {
      // $(".search_parameters").on('click', "input[value='See Connections']", findResults)
      $(".search_template").on('click', '.industry', scanPreviousIndustryResults);

      // $(".search_template").on('toggle', '.location', searchResultsField);
  }

  var previous_results = $('#results .item');

 
 var scanPreviousIndustryResults = function(event) {
  event.preventDefault();
  debugger
  var class_state = $(this).attr('class');
  var value_state = $(this).attr('value');
  console.log(class_state);
 //  if ( class_state != 'active') {
 //   $(this).addClass('active');
 // }
 // else {
 //    $(this).removeClass('active');
 //   $(this).addClass('unctive');
 // };

  // var industries = $('.search_template .industry')
  // var industry_array = [];
  // for (var i = 0; i < industries.length; i++) {
  //   industry_array.push(industries[i].value);
  // };

  
  // for (var i = 0; i < previous_results.length; i ++) {
  //   if (industry_array.indexOf(previous_results.find('p:eq(1)')[i].innerHTML) != -1) {
  //    console.log(previous_results[i]);
  //   }; 
  // }
  var counter = 0;
  for (var i = 0; i < previous_results.length; i ++) {
    if (previous_results.find('p:eq(1)')[i].innerHTML.indexOf(value_state) != -1) {
     previous_results[i].remove();
     counter +=1;
    }; 
  };

  if (counter == 0) {retrieveIndustries}

  // findIndustries;

 };


  var retrieveIndustries = function() {

 

    var ajaxRequest = $.ajax({
      type: 'post',
      url: '/industries',
      data: $(this).attr('value')
    });

    ajaxRequest.done( function(data) {
      var result_item = $('#results').clone().appendTo('#results');

      for (var i = 0; i < data.connections.length; i++) {
        var result_item = $('#results .item:first').clone().appendTo('#results')
        $(result_item).find('img').attr("src", data.connections[i].picture_url);
        $(result_item).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
        $(result_item).find('p:first').text(data.connections[i].headline);
        $(result_item).find('p:eq(1)').text(data.industry);
        // $(result_item).find('p:eq(2)').text(data.connections[i].location.location_name);

      }
      console.log(data.connections);
    })
  };



bindEvents();

});




