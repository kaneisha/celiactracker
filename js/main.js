var landingTemplate;
var appTemplate;

var onPress = function(e){
      	if(e.keyCode == 13){
      		var search = $('.result_search').val();
			loadResults(search);
      	}
      }

window.addEventListener('keydown', onPress);

var loginCheck = function() {
	$.ajax({
		url : 'php/loginCheck.php',
		type : 'get',
		dataType : 'json',
		success : function(response) {
			if (response.username) {
				console.log('user exists');
				userID = response.username.id;
				userName = response.username.username;
				loadLoggedIn(userID,userName);
			} else {
				console.log('go home');
				loadLanding();
			}
		}
	});
};

loginCheck();

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
			//console.log('clicks');
			e.preventDefault();
			var search = $('#user_search').val();
			loadResults(search);
		});

		$('#signup').on('click', function(e) {
			//console.log('clicks');
			e.preventDefault();
			loadRegister();
		});

		$('#login').on('click', function(e) {
			console.log('clicks');
			e.preventDefault();
			loadLogin();
		});

	});
};

//loadLanding();

var loadLoggedIn = function(userID,userName) {
	console.log(userID);
	$('#wrap').empty();
	//console.log('run');
	$.get('templates/template.html', function(htmlArg) {

		appTemplate = htmlArg;

		var loggedIn = $(htmlArg).find('#loggedIn').html();
		$.template('loggedIntemplate', loggedIn);

		var html = $.render('', 'loggedIntemplate');

		$('#wrap').append(html);

		$('#enter').on('click', function(e) {
			//console.log('clicks');
			e.preventDefault();
			var search = $('#user_search').val();
			loadMemberResults(search);
		});

		$('#signup').on('click', function(e) {
			//console.log('clicks');
			e.preventDefault();
			loadRegister();
		});

		$('#login').on('click', function(e) {
			//console.log('clicks');
			e.preventDefault();
			loadLogin();
		});

		$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

		$(document).on('click', '#books', function(e) {
			console.log('clicks');
			e.preventDefault();
			loadGlutenFreeList();
		});

		$('#space').html('<p id="welcome">Welcome, ' + userName + '</p> <input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menu"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li>Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );

	});
};

//----------------------------------------------------- Register -------------------------------------------------------------------------//
var loadRegister = function(){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var signup = $(htmlArg).find('#signup').html();
		$.template('registertemplate', signup);

		var html = $.render('', 'registertemplate');

	$('#wrap').append(html);

	$('#sign_up').on('click', function(e) {
			console.log('clicks');
			e.preventDefault();
			register();
		});
});
};

var register = function() {
	var user = $('#user').val();
	var pass = $('#pass').val();
	var email = $('#email').val();
	$.ajax({
		url : 'php/register.php',
		data : {
		username : user,
		password : pass,
		email : email
	},
	type : 'post',
	dataType : 'json',
	success : function(response) {
	if (response.username) {
	console.log(response.username);
	console.log("hey");
	var userID = response.username.id;
	var userName = response.username.username;
	loadLoggedIn(userID,userName);
	} else {
	console.log(response);
	if(response.error == "Not a valid Email Address"){
		$('#email_error').append(response.error);
		// $("#pwd_error").css("display","none");
		// $("#error").css("display","none");
	}
	if(response.error == "Email already exists"){
		$('#email_error').append(response.error);
		// $("#pwd_error").css("display","none");
		// $("#error").css("display","none");
	}
	if(response.error == "Password must be at least 8 to 15 characters"){
		$('#pwd_error').append(response.error);
		$("#email_error").css("display","none");
		$("#error").css("display","none");
	}
	if(response.error == "Username already exists"){
		$('#error').append(response.error);
		$("#email_error").css("display","none");
		// $("#pwd_error").css("display","none");
	}

	}
	}
	//return false;
	});

	return false;
};


//----------------------------------------------------- Login -------------------------------------------------------------------------//
var loadLogin = function(){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var login = $(htmlArg).find('#login').html();
		$.template('logintemplate', login);

		var html = $.render('', 'logintemplate');

	$('#wrap').append(html);

	$('#login_btn').on('click', function(e) {
			console.log('clicks');
			e.preventDefault();
			loginUser();
	});
});
};

var loginUser = function() {


	var user = $('#login_user').val();
	var pass = $('#login_pass').val();

	// console.log(user, pass, "login running");

	$.ajax({
		url : 'php/login.php',
		type : 'post',
		dataType : 'json',
		data : {
			username : user,
			password : pass
		},
		success : function(response) {

		console.log(response, user, pass, "hello? success");
		if (response) {
			console.log("logged in");
			//loadLanding();
			var userID = response.username.id;
			var userName = response.username.username;
			loadLoggedIn(userID,userName);
		} else {
			console.log(response, user, pass);
			if(response.error == "Invalid Login"){
				$('#login_error').append(response.error);
			}
		}
		},
		error: function(response){
			console.log(response, user, pass, "hello? error");
		}//success
	//return false;
	});

	return false;
};

// ------------------------------------------------------ Logout ------------------------------------------------------------------------//
var logout = function() {
$.get('php/logout.php', function() {
window.location.replace("http://localhost:8888");
});
return false;
};

// ------------------------------------------------------ Results ------------------------------------------------------------------------//
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

// ------------------------------------------------------ Member Results --------------------------------------------------------------------//
var loadMemberResults = function(search){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var resultsmemberlist = $(htmlArg).find('#results').html();
		$.template('resultsmembertemplate', resultsmemberlist);

		var html = $.render('', 'resultsmembertemplate');

	$('#wrap').append(html);

	var api = "http://api.nutritionix.com/v1/search/" + search + "?results=0:21&fields=item_name,brand_name,item_id,nf_ingredient_statement&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";

	getMemberResults(api);
});
};

var getMemberResults = function(api){
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
      	loadMemberProduct(item);
      });

      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li>Bookmarks</li>\
					<li>Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );


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

      if(data.nf_ingredient_statement === null){
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }


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
      regex = RegExp(words.join('|'), 'gi'), //case insensitive
      replacement = '<'+ tag +'>$&</'+ tag +'>';

  	return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

$('#statement').wrapInTag({
  tag: 'strong',
  words: ['wheat', 'Oats', 'rye', 'barley', 'gluten free', 'gluten']
});

});

};

//--------------------------------------------------------- Member Product ------------------------------------------------------------------//
var loadMemberProduct = function(item){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var productmemberlist = $(htmlArg).find('#member_product').html();
		$.template('productmembertemplate', productmemberlist);

		var html = $.render('', 'productmembertemplate');

	$('#wrap').append(html);
	// console.log(item);

	getMemberProduct(item);
});
};

var getMemberProduct = function(item){
	$.getJSON( item, {
	    format: "json"
	  })

    .done(function( data ) {
      //console.log(data);
      $('#statement').append(data.nf_ingredient_statement);
      $('h2').append(data.item_name);

      if(data.nf_ingredient_statement === null){
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }


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
      }else if(data.nf_ingredient_statement.indexOf("Wheat") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else{
      	$('#gluten').html('This product does not contain Gluten');
      }

$.fn.wrapInTag = function(opts) {

	var tag = opts.tag || 'strong',
      words = opts.words || [],
      regex = RegExp(words.join('|'), 'gi'), //case insensitive
      replacement = '<'+ tag +'>$&</'+ tag +'>';

  	return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

$('#statement').wrapInTag({
  tag: 'strong',
  words: ['wheat', 'Oats', 'rye', 'barley', 'gluten free', 'gluten']
});

}); // Done statement

$('#gluten_free').on('click', function(e) {
			//console.log('clicks');
			$('#gluten_free').css("display","none");
			$('#not_gluten').css("display","none");
			$('#buttons').append('<p>Has been added to your bookmarks!</p>');
			$('#buttons p').css("color", "#6cb419");
			e.preventDefault();
			// $('#buttons').append('<p>Has been added to your bookmarks!</p>');
			// $('#buttons').css("display","none");
			glutenFreeBookmark(item);
});
$('#not_gluten').on('click', function(e) {
			//console.log('clicks');
			e.preventDefault();
			glutenBookmark(item);
});

};

//--------------------------------------------------------- Bookmarks ------------------------------------------------------------------//
var glutenFreeBookmark = function(item){
	$.getJSON( item, {
	    format: "json"
	  })

	.done(function( data ) {
		$.ajax({
		url : 'php/glutenfree.php',
		data : {
			name: data.item_name,
			ingredients: data.nf_ingredient_statement
		},
		type : 'post',
		dataType : 'json',
		success : function(response) {
			if (response) {
				// console.log('bookmarked');
				// $('#buttons').css("display","none");
				// $('#buttons').append('<p>Has been added to your bookmarks!</p>');
			} else {
				console.log('did not work');
			}
			// $('#buttons').css("display","none");
			//$('#buttons').append('<p>Has been added to your bookmarks!</p>');
		}
	});
	}); // Done Statement
}

var glutenBookmark = function(item){
	$.getJSON( item, {
	    format: "json"
	  })

	.done(function( data ) {
		$.ajax({
		url : 'php/gluten.php',
		data : {
			item: data.item_name,
			ingredients: data.nf_ingredient_statement
		},
		type : 'post',
		dataType : 'json',
		success : function(response) {
			if (response) {
				console.log('bookmarked');
			} else {
				console.log('did not work');
			}
		}
	});
	}); // Done Statement
}

//--------------------------------------------------------- Bookmarks List ------------------------------------------------------------------//
var loadGlutenFreeList = function(){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var glutenfreelist = $(htmlArg).find('#gluten_list').html();
		$.template('glutenlisttemplate', glutenfreelist);

		var html = $.render('', 'glutenlisttemplate');

	$('#wrap').append(html);

	getGlutenFreeList();
});
};

var getGlutenFreeList = function() {
	console.log("go");
	$.ajax({
		url : '/php/glutenFreeList.php',
		type : 'get',
		dataType : 'json',
		success : function(response) {
			// console.log(response);
			if(response){
				console.log(response);
				// console.log("hey");
				 for(var i = 0; i < response.length; i++){
		        	console.log(i);

		      		}
			}else{
				console.log("no");
			}

		}
	});
};
