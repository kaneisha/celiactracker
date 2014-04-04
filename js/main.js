var landingTemplate;

var loadLanding = function() {
	// console.log("hey");
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

// ------------------------------------------------------ Results ------------------------------------------------------------------------//
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
        $('#list').append('<p data-id="' + data.hits[i].fields.item_id + '">' + data.hits[i].fields.item_name + '</p> <div id="line"></div>');

      }

      $('#list p').on('click', function(e){
      	e.preventDefault();
      	// console.log('clicker');
      	var itemid = ($(this).attr("data-id"));
      	var item = "https://api.nutritionix.com/v1_1/item?id=" + itemid + "&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";
      	// console.log(itemid);
      	loadProduct(item);
      })



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

	var api = "http://api.nutritionix.com/v1/search/" + search + "?results=0:21&fields=item_name,brand_name,item_id,nf_ingredient_statement&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";

	getResults(api);
});
};

//--------------------------------------------------------- Product ------------------------------------------------------------------------//

var loadProduct = function(item){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var productlist = $(htmlArg).find('#product').html();
		$.template('producttemplate', productlist);

		var html = $.render('', 'producttemplate');

	$('#wrap').append(html);
	// console.log(item);

	getProduct(item);
});
};

var getProduct = function(item){
	$.getJSON( item, {
	    format: "json"
	  })

    .done(function( data ) {
      console.log(data);
      $('#statement').append(data.nf_ingredient_statement);
      $('h2').append(data.item_name);


      if(data.nf_ingredient_statement.indexOf("WHEAT") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("Rye") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("Barley") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("Oats") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else{
      	$('#gluten').html('This product does not contain Gluten');
      }

      $.fn.wrapInTag = function(opts) {

  var tag = opts.tag || 'strong',
      words = opts.words || [],
      regex = RegExp(words.join('|'), 'gi'),
      replacement = '<'+ tag +'>$&</'+ tag +'>';

  	return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

$('#statement').wrapInTag({
  tag: 'strong',
  words: ['WHEAT', 'Oats']
});


    });


}