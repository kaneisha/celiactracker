var landingTemplate;

var loadLanding = function() {
	console.log("hey");
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var landing = $(htmlArg).find('#landing').html();
		$.template('landingtemplate', landing);

		var html = $.render('', 'landingtemplate');

		$('#wrap').append(html);

		$('#enter').on('click', function(e) {
			console.log('clicks');
			e.preventDefault();
			var search = $('#user_search').val();
			loadResults(search);
		});

	});
};

loadLanding();

var getResults = function(api){
	  $.getJSON( api, {
	    // tags: "mount rainier",
	    // tagmode: "any",
	    format: "json"
	  })
    .done(function( data ) {
      console.log(data);
       $('#counter').append('<p>' + data.hits.length + ' results found </p>');

      for(var i = 0; i < data.hits.length; i++){
        $('#list').append('<p>' + data.hits[i].fields.item_name + '</p> <div id="line"></div>');

      }

    });
};

var loadResults = function(search){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var resultslist = $(htmlArg).find('#results').html();
		$.template('resultstemplate', resultslist);

		var html = $.render('', 'resultstemplate');

	$('#wrap').append(html);

	//var search = $('#user_search').val();
	var api = "http://api.nutritionix.com/v1/search/" + search + "?results=0:21&fields=item_name,brand_name,item_id,nf_ingredient_statement&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";

	getResults(api);
});
};
// };