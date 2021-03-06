$(document).ready(function() {
    function bindEvents() {
      $(".search_template").on('click', '.industry', scanPreviousIndustryResults);
      $(".search_template").on('click', '.location', scanPreviousLocationResults);
      $('#results').on('mouseover', '.outer', showProfile);
      $('#results').on('mouseout', '.outer', hideProfile);
      $('#results').on('click', '.outer', makeLinkable);
  }

  var makeLinkable = function(event) {
    var url = $(this).find('a').attr('href')   
    // $(location).attr('href',url);
    window.open(url);
  }

  var showProfile = function(event) {
    $(this).find('img').css({
                       width : '150px',
                       height : '150px'
                      });
    
    var profile = $(this).clone();
    $('#selected_profile').append(profile);
    $('#selected_profile .inner').show();
    
  }

  var hideProfile = function(event) {
    $('#selected_profile .outer:first').remove();
    $(this).find('img').css({
                       width : '',
                       height : ''
                      });
  };


  function calculateResults() {
    var resultsCount = $('#results div').length;
    $('#results_count h3').html('Now showing ' + resultsCount + ' connections');
  }
  
  var scanPreviousIndustryResults = function(event) {
    event.preventDefault();
    var industryPushed = $(this).attr('value');


    if ($(this).attr('class') !==  'industry active') {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    };

    var previous_results = $('#results .' + industryPushed.split(' ').join('.'));
    var counter = 0;
    if (previous_results.length > 0) {
      $(previous_results).remove();
      calculateResults();
      counter+=1;
    };

    if (counter === 0) {

      var ajaxRequest = $.ajax({
        type: 'post',
        url: '/industries',
        data: $(this).attr('value')
      });

      ajaxRequest.done( function(data) {
        for (var i = 0; i < data.connections.length; i++) {
          // $('#results').append("<div><img><h3></h3><p></p><p></p><a></a></div>");
          $('#results').append("<div class = 'outer'><img><div class = 'inner' style='display: none;'><h3></h3><p></p><p></p><p></p><a></a></div></div>");


          var template = $('#results .outer:last');
          $(template).addClass(data.industry);
          $(template).find('img').attr("src", data.connections[i].picture_url);
          $(template).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
          $(template).find('p:first').text(data.connections[i].headline);
          $(template).find('p:eq(1)').text(data.connections[i].industry_name);
          $(template).find('p:eq(2)').text(data.connections[i].location_name);
          $(template).find('a').attr("href",  data.connections[i].profile_url );
          // $(template).find('a').text(data.connections[i].first_name + "s LinkedIn Profile")
          calculateResults();

          // var template = $('#results div:last');
          // $(template).addClass(data.industry);
          // $(template).find('img').attr("src", data.connections[i].picture_url);
          // $(template).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
          // $(template).find('p:first').text(data.connections[i].headline);
          // $(template).find('p:eq(1)').text(data.connections[i].industry_name);
          // $(template).find('p:eq(2)').text(data.connections[i].location_name);
          // $(template).find('a').attr("href", data.connections[i].profile_url );
          // $(template).find('a').text(data.connections[i].first_name + "s LinkedIn Profile")
          // calculateResults();
        }
      })

    };
    

  };

   var scanPreviousLocationResults = function(event) {
    event.preventDefault();
    var locationPushed = $(this).attr('value');
    // console.log(locationPushed);

    if ($(this).attr('class') !==  'location active') {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    };

    var previous_results = $('#results .' + locationPushed.split(' ').join('.'));
    var counter = 0;
    if (previous_results.length > 0) {
      $(previous_results).remove();
      calculateResults();
      counter+=1;
    };

    if (counter === 0) {

      var ajaxRequest = $.ajax({
        type: 'post',
        url: '/locations',
        data: $(this).attr('value')
      });

      ajaxRequest.done( function(data) {
        for (var i = 0; i < data.connections.length; i++) {
          // $('#results').append("<div><img><h3></h3><p></p><p></p></div>");
          $('#results').append("<div class = 'outer'><img><div class = 'inner' style='display: none;'><h3></h3><p></p><p></p><p></p><a></a></div></div>");
          // $('#results').append("<div class = outer><img><div class = 'inner' style<h3></h3><p></p><p></p><a></a></div>");

          var template = $('#results .outer:last');
          $(template).addClass(data.location);
          $(template).find('img').attr("src", data.connections[i].picture_url);
          $(template).find('h3').text(data.connections[i].first_name +' ' + data.connections[i].last_name);
          $(template).find('p:first').text(data.connections[i].headline);
          $(template).find('p:eq(1)').text(data.connections[i].industry_name);
          $(template).find('p:eq(2)').text(data.connections[i].location_name);
          $(template).find('a').attr("href",  data.connections[i].profile_url );
          // $(template).find('a').text(data.connections[i].first_name + "s LinkedIn Profile")
          calculateResults();
        }
      })
    };



    calculateResults();
 };

bindEvents();


});



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



