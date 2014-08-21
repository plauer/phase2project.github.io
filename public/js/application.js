$(document).ready(function() {
    function bindEvents() {
      $(".search_template").on('click', '.industry', scanPreviousIndustryResults);

      // $(".search_template").on('toggle', '.location', searchResultsField);
  }

  // var result_item = $('#results .item:first');
  // result_item.remove(); FIX TOMORROW
  
  var scanPreviousIndustryResults = function(event) {
    event.preventDefault();
    if ($(this).attr('class') !==  'industry active') {
      $(this).addClass('active');
    }
    else {$(this).removeClass('active')};

    var previous_results = $('#results .item');
 
    var value_state = $(this).attr('value');
    

    var counter = 0;
    for (var i = 0; i < previous_results.length; i ++) {
      if (previous_results.find('p:eq(1)')[i].innerHTML.indexOf(value_state) != -1) {
       previous_results[i].remove();
       counter +=1;
      }; 
    };


    if (counter == 0) {

      var ajaxRequest = $.ajax({
        type: 'post',
        url: '/industries',
        data: $(this).attr('value')
      });

      ajaxRequest.done( function(data) {
        for (var i = 0; i < data.connections.length; i++) {
          $('#results').append("<div class = 'item'><img><h3></h3><p></p><p></p></div>");
          var template = $('#results .item:last');
          $(template).find('img').attr("src", data.connections[i].picture_url);
          $(template).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
          $(template).find('p:first').text(data.connections[i].headline);
          $(template).find('p:eq(1)').text(data.industry);
        }
        console.log(data.connections);
      })





    }

    // findIndustries;

 };


  // var retrieveIndustries = function(event) {
    
  //   debugger
 

  //   var ajaxRequest = $.ajax({
  //     type: 'post',
  //     url: '/industries',
  //     data: $(this).attr('value')
  //   });

  //   ajaxRequest.done( function(data) {
  //     var result_item = $('#results').clone().appendTo('#results');

  //     for (var i = 0; i < data.connections.length; i++) {
  //       var result_item = $('#results .item:first').clone().appendTo('#results')
  //       $(result_item).find('img').attr("src", data.connections[i].picture_url);
  //       $(result_item).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
  //       $(result_item).find('p:first').text(data.connections[i].headline);
  //       $(result_item).find('p:eq(1)').text(data.industry);
  //       // $(result_item).find('p:eq(2)').text(data.connections[i].location.location_name);

  //     }
  //     console.log(data.connections);
  //   })
  // };



bindEvents();

});




