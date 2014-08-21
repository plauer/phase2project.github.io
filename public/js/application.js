$(document).ready(function() {
    function bindEvents() {
      // $(".search_parameters").on('click', "input[value='See Connections']", findResults)
      $(".search_template").on('click', '.industry', industrySearchResultsField);
      $(".search_template").on('toggle', '.location', searchResultsField);
  }

  var industries = $('#results .item').find('p:eq(1)');

 
 var industrySearchResultsField = function(event) {
  event.preventDefault();
   $(this).class('.active');

  // var industries = $('.search_template .industry')
  // var array = [];
  // for (var i = 0; i < industries.length; i++) {
  //   array.push(industries[i].value);
  // };

  // findIndustries;

 };


  var findIndustries = function(event) {
    event.preventDefault();
 

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




