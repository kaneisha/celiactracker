var landingTemplate;
var appTemplate;

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

		$(document).on('click', '#history', function(e) {
			console.log('clicks history');
			e.preventDefault();
			loadHistoryList();
		});

		$(document).on('click', '.brand', function(e) {
			e.preventDefault();
			loadLoggedIn(userID,userName);
		});

		$(document).on('click', '.brand_nonmember', function(e) {
			e.preventDefault();
			loadLanding();
		});

		$(document).on('click', '.brand_nonmemberresults', function(e) {
			e.preventDefault();
			loadLanding();
		});

		$(document).on('click', '.arrow', function(e) {
			e.preventDefault();
			loadLanding();
		});

var onPress = function(e){
      	if(e.keyCode == 13){

      		var home = $('#home').length;
      		var loggedout =  $('.loggedout').length;

      		if(home === 1){
      			var search = $('#user_search').val();
      			if(loggedout === 1){
      				loadResults(search);
      			}else{
      				loadMemberResults(search);
      			}
      		}else{

      			var search = $('.result_search').val();

      			console.log(loggedout);
      			if(loggedout === 1){
      				loadResults(search);
      			}else{
      				loadMemberResults(search);
      			}

      		}


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


		$('#space').html('<p id="welcome">Welcome, ' + userName + '</p> <input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menu"></label>\
				<nav>\
				<ul>\
					<li id="books"><img src="images/bkm.png" class="icons">Bookmarks<div class="nav_line"></div></li>\
					<li id="history"><img src="images/history.png" class="icons">Search History<div class="nav_line"></div></li>\
					<li id="logout"><img src="images/logout.png" class="icons">Logout</li>\
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
			// clear error div
			$('.s_error').empty();
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
	}
	else if(response.error == "Email already exists"){
		$('#email_error').append(response.error);
	}
	else if(response.error == "Password must be at least 8 to 15 characters"){
		$('#pwd_error').append(response.error);
	}
	else if(response.error == "Username already exists"){
		$('#error').append(response.error);
	};



	}
	}

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
		if (response.username) {
			console.log("logged in");
			//loadLanding();
			var userID = response.username.id;
			var userName = response.username.username;
			loadLoggedIn(userID,userName);
		} else {
			console.log(response, user, pass);
			$('#login_error').html('Invalid Login');
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

	getResults(api,search);
});
};


var getResults = function(api,search){
	  $.getJSON( api, {
	    // tags: "mount rainier",
	    // tagmode: "any",
	    format: "json"
	  })
    .done(function( data ) {
      console.log(data);
       $('#counter').append('<p>' + data.hits.length + ' results found </p>');


      for(var i = 0; i < data.hits.length; i++){
        $('#list').append('<p data-id="' + data.hits[i].fields.item_id + '">' + data.hits[i].fields.item_name + '</p> <div class="line"></div>');

      }

      $('#list p').on('click', function(e){
      	e.preventDefault();
      	// console.log('clicker');
      	var itemid = ($(this).attr("data-id"));
      	var item = "https://api.nutritionix.com/v1_1/item?id=" + itemid + "&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";
      	// console.log(itemid);
      	loadProduct(item,search);
      })


    });


};

// ------------------------------------------------------ Member Results --------------------------------------------------------------------//
var loadMemberResults = function(search){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var resultsmemberlist = $(htmlArg).find('#member_results').html();
		$.template('resultsmembertemplate', resultsmemberlist);

		var html = $.render('', 'resultsmembertemplate');

	$('#wrap').append(html);

	var api = "http://api.nutritionix.com/v1/search/" + search + "?results=0:21&fields=item_name,brand_name,item_id,nf_ingredient_statement&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";

	getMemberResults(api,search);
});
};

var getMemberResults = function(api,search){
	  $.getJSON( api, {
	    // tags: "mount rainier",
	    // tagmode: "any",
	    format: "json"
	  })
    .done(function( data ) {
      console.log(data);
       $('#counter').append('<p>' + data.hits.length + ' results found </p>');


      for(var i = 0; i < data.hits.length; i++){
        $('#list').append('<p data-id="' + data.hits[i].fields.item_id + '">' + data.hits[i].fields.item_name + '</p> <div class="line"></div>');
        var start = 0;
        var length = 50;

      }

      $('#list p').on('click', function(e){
      	e.preventDefault();
      	// console.log('clicker');
      	var itemid = ($(this).attr("data-id"));
      	var item = "https://api.nutritionix.com/v1_1/item?id=" + itemid + "&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf";
      	//var error = "NetworkError: 409 Conflict - https://api.nutritionix.com/v1_1/item?id=" + itemid + "&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf&format=json";

      	// if(item.response == "error_message"){
      	// 	console.log('heyyyyyyy');
      	// }

      	// if(item === "NetworkError: 409 Conflict - https://api.nutritionix.com/v1_1/item?id=" + itemid + "&appId=58e7409d&appKey=ea55d470d93bafbab65a666b2541abcf&format=json"){
      	// 	console.log('hey');
      	// }

      	// if(item == "NetworkError: 409 Conflict"){
      	// 	console.log('hey');
      	// }
      	// if(item === error){
      	// 	console.log('heyyyy');
      	// }
      	loadMemberProduct(item,search);
      	addSearchHistory(item);
      });

      $(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );


    });
};
//--------------------------------------------------------- Product ------------------------------------------------------------------------//

var loadProduct = function(item,search){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var productlist = $(htmlArg).find('#product').html();
		$.template('producttemplate', productlist);

		var html = $.render('', 'producttemplate');

	$('#wrap').append(html);
	// console.log(item);

	getProduct(item,search);
});
};

var getProduct = function(item,search){
	$.getJSON( item, {
	    format: "json"
	  })

    .done(function( data ) {
      console.log(data);
      $('#resultsapi').on('click', function(e){
			e.preventDefault();
			loadResults(search);
		})
      $('#statement').append(data.nf_ingredient_statement);
      $('h2').append(data.item_name);

      if(data.nf_ingredient_statement === null){
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }

      if(data.response === '"error_message":"This record has been deleted","error_code":"DELETED_RECORD","status_code":409'){
      	$('h2').html('Item not available');
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }


      if(data.nf_ingredient_statement.indexOf("WHEAT") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("wheat") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("Wheat") > -1){
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
var loadMemberProduct = function(item,search){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var productmemberlist = $(htmlArg).find('#member_product').html();
		$.template('productmembertemplate', productmemberlist);

		var html = $.render('', 'productmembertemplate');

	$('#wrap').append(html);
	// console.log(item);

	getMemberProduct(item,search);
});
};

var getMemberProduct = function(item,search){
	$.ajax({
		url: item,
	    dataType: "json",
	    type: 'get'
	  })

	.error(function(d){
		console.log(d, "request data");
		if(d.statusText === "Conflict"){
			$('h2').html('Item not available');
			$('#statement').html('Ingredients not available');
      		$('#gluten').html('Ingredients not available');
		}
	})

    .success(function( data ) {

      $('#resultsmemberapi').on('click', function(e){
			e.preventDefault();
			loadMemberResults(search);
		})
      $('#statement').append(data.nf_ingredient_statement);
      $('h2').append(data.item_name);

      if(data.nf_ingredient_statement === null){
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }


      if(data.nf_ingredient_statement.indexOf("WHEAT") > -1){
      	$('#gluten').css('color', 'red');
      	$('#gluten').html('This product contains Gluten');
      }else if(data.nf_ingredient_statement.indexOf("wheat") > -1){
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
			$('#buttons p').css("text-align", "center");
			$('#buttons p').css("margin-top", "60px");
			$('#buttons p').css("font-weight", "bold");
			$('#buttons p').css("font-family", "garamond");
			e.preventDefault();
			glutenFreeBookmark(item);
});
$('#not_gluten').on('click', function(e) {
			$('#gluten_free').css("display","none");
			$('#not_gluten').css("display","none");
			$('#buttons').append('<p>Has been added to your bookmarks!</p>');
			$('#buttons p').css("color", "#6cb419");
			$('#buttons p').css("text-align", "center");
			$('#buttons p').css("margin-top", "60px");
			$('#buttons p').css("font-weight", "bold");
			$('#buttons p').css("font-family", "garamond");
			e.preventDefault();
			glutenBookmark(item);
});

$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );

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

			} else {
				console.log('did not work');
			}
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

//--------------------------------------------------------- Gluten Free Bookmarks List ------------------------------------------------------------------//
var loadGlutenFreeList = function(){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var glutenfreelist = $(htmlArg).find('#gluten_list').html();
		$.template('glutenlisttemplate', glutenfreelist);

		var html = $.render('', 'glutenlisttemplate');

	$('#wrap').append(html);

	getGlutenFreeList();

	$('#glutenbtn').on('click', function(e){
		loadGlutenList();
	});

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
				//console.log(response);
				// console.log("hey");
				 for(var i = 0; i < response.length; i++){
		        	//console.log(response[i].ingredients);
		        	$('#bookmarklist').append('<p data-id="'+ response[i].ingredients + '" data-pid="'+ response[i].name + '">' + response[i].name + '</p> <img data-itemid="'+ response[i].id + '" src="images/trash.png" id="trash"> <div class="line"></div>');

		      		}

		      	    $('#bookmarklist p').on('click', function(e){
				      	e.preventDefault();
				      	var item = ($(this).attr("data-id"));
				      	var pitem = ($(this).attr("data-pid"));
				      	loadGlutenFreeProduct(item,pitem);
				    });

		      	    $('#bookmarklist #trash').on('click', function(e){
		      	    	e.preventDefault();
		      	    	var itemid = ($(this).attr("data-itemid"));
				      	console.log(itemid);
						loadDeleteGlutenFree(itemid);
					});
			}else{
				console.log("no");
			}

		} // Success Function
	});

	$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

	      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );
};

var loadDeleteGlutenFree = function(itemid){
	console.log(itemid);
	$.ajax({
		url : '/php/removeBookmark.php',
		data : {
			id: itemid,
		},
		type : 'get',
		dataType : 'text',
		success : function(response) {
			console.log(response);
			if (response) {
				console.log('removed bookmark');
			} else {
				loadGlutenFreeList()
				console.log('did not remove');
			}
		},
		error: function(response){
			console.log(response, 'hi');
		}
	});
};


var loadGlutenFreeProduct = function(item,pitem){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

	landingTemplate = htmlArg;

	var glutenfreeproduct = $(htmlArg).find('#bookmarkproduct').html();
	$.template('glutenfreeproducttemplate', glutenfreeproduct);

	var html = $.render('', 'glutenfreeproducttemplate');

	$('#wrap').append(html);
	// console.log(item,pitem);
	getGlutenFreeProduct(item,pitem);
});
};

var getGlutenFreeProduct = function(item,pitem){
	console.log(item);
	 $('#glutenfreestatement').append(item);
     $('h2').append(pitem);

     if(item.indexOf("WHEAT") > -1){
      	$('#bookmarkglutenfree').css('color', 'red');
      	$('#bookmarkglutenfree').html('This product contains Gluten');
      }else if(item.indexOf("Rye") > -1){
      	$('#bookmarkglutenfree').css('color', 'red');
      	$('#bookmarkglutenfree').html('This product contains Gluten');
      }else if(item.indexOf("Barley") > -1){
      	$('#bookmarkglutenfree').css('color', 'red');
      	$('#bookmarkglutenfree').html('This product contains Gluten');
      }else if(item.indexOf("Oats") > -1){
      	$('#bookmarkglutenfree').css('color', 'red');
      	$('#bookmarkglutenfree').html('This product contains Gluten');
      }else if(item.indexOf("Wheat") > -1){
      	$('#bookmarkglutenfree').css('color', 'red');
      	$('#bookmarkglutenfree').html('This product contains Gluten');
      }else{
      	$('#bookmarkglutenfree').html('This product does not contain Gluten');
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

$('#glutenfreestatement').wrapInTag({
  tag: 'strong',
  words: ['wheat', 'Oats', 'rye', 'barley', 'gluten free', 'gluten']
});

      $(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});


            $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );

}

//--------------------------------------------------------- Gluten Bookmarks List ------------------------------------------------------------------//
var loadGlutenList = function(){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var glutenfreelist = $(htmlArg).find('#gluten_list').html();
		$.template('glutenlisttemplate', glutenfreelist);

		var html = $.render('', 'glutenlisttemplate');

	$('#wrap').append(html);

	getGlutenList();

});
};

var getGlutenList = function() {
	$.ajax({
		url : '/php/glutenList.php',
		type : 'get',
		dataType : 'json',
		success : function(response) {
			// console.log(response);
			if(response){
				 for(var i = 0; i < response.length; i++){
		        	//console.log(response[i].ingredients);
		        	$('#bookmarklist').append('<p data-id="'+ response[i].ingredients + '" data-pid="'+ response[i].name + '">' + response[i].name + '</p><img data-itemid="'+ response[i].id + '" src="images/trash.png" id="trash"> <div class="line"></div>');

		      		}

		      	     $('#bookmarklist p').on('click', function(e){
				      	e.preventDefault();
				      	// console.log('clicker');
				      	var item = ($(this).attr("data-id"));
				      	var pitem = ($(this).attr("data-pid"));
				      	loadGlutenProduct(item,pitem);
				      });

		      	     $('#bookmarklist #trash').on('click', function(e){
		      	    	e.preventDefault();
		      	    	var itemid = ($(this).attr("data-itemid"));
				      	console.log(itemid);
						loadDeleteGluten(itemid);
					 });
			}else{
				console.log("no");
			}

		} // Success Function
	});

	$('#glutenfreebtn').on('click', function(e){
		loadGlutenFreeList();
	});

	$(document).on('click', '#logout', function(e) {
			e.preventDefault();
			logout();
		});

	      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );
};

var loadDeleteGluten = function(itemid){
	console.log(itemid);
	$.ajax({
		url : '/php/removeBookmarkGluten.php',
		data : {
			id: itemid,
		},
		type : 'get',
		dataType : 'text',
		success : function(response) {
			console.log(response);
			if (response) {
				console.log('removed bookmark');
			} else {
				loadGlutenList()
				console.log('did not remove');
			}
		},
		error: function(response){
			console.log(response, 'hi');
		}
	});
};

var loadGlutenProduct = function(item,pitem){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

	landingTemplate = htmlArg;

	var glutenproduct = $(htmlArg).find('#glutenbookmarkproduct').html();
	$.template('glutenproducttemplate', glutenproduct);

	var html = $.render('', 'glutenproducttemplate');

	$('#wrap').append(html);
	// console.log(item,pitem);
	getGlutenProduct(item,pitem);
});
};

var getGlutenProduct = function(item,pitem){
	console.log(item);
	 $('#glutenstatement').append(item);
     $('h2').append(pitem);

     if(item === ''){
      	$('#statement').html('Ingredients not available');
      	$('#gluten').html('Ingredients not available');
      }

     if(item.indexOf("WHEAT") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("Rye") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("Barley") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("Oats") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("Wheat") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("wheat") > -1){
      	$('#bookmarkgluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else{
      	$('#bookmarkgluten').html('This product does not contain Gluten');
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

$('#glutenstatement').wrapInTag({
  tag: 'strong',
  words: ['wheat', 'Oats', 'rye', 'barley', 'gluten free', 'gluten']
});

$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );

}

//--------------------------------------------------------- Search History ------------------------------------------------------------------//
var addSearchHistory = function(item){
	$.getJSON( item, {
	    format: "json"
	  })

	.done(function( data ) {
		$.ajax({
		url : 'php/searchHistory.php',
		data : {
			name: data.item_name,
			ingredients: data.nf_ingredient_statement
		},
		type : 'post',
		dataType : 'json',
		success : function(response) {
			if (response) {
				console.log('it added');

			} else {
				console.log('did not work');
			}
		}
	});
	}); // Done Statement
}

var loadHistoryList = function(){

	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

		landingTemplate = htmlArg;

		var historylist = $(htmlArg).find('#sh_list').html();
		$.template('historylisttemplate', historylist);

		var html = $.render('', 'historylisttemplate');

	$('#wrap').append(html);

	getHistoryList();

});
};

var getHistoryList = function() {
	$.ajax({
		url : '/php/historyList.php',
		type : 'get',
		dataType : 'json',
		success : function(response) {
			// console.log(response);
			if(response){
				//console.log(response);
				// console.log("hey");
				 for(var i = 0; i < response.length; i++){
		        	$('#shlist').append('<p data-id="'+ response[i].ingredients + '" data-pid="'+ response[i].name + '">' + response[i].name + '</p><img data-itemid="'+ response[i].id + '" src="images/trash.png" id="trash"> <div class="line"></div>');

		      		}

		      	     $('#shlist p').on('click', function(e){
				      	e.preventDefault();
				      	var item = ($(this).attr("data-id"));
				      	var pitem = ($(this).attr("data-pid"));
				      	loadHistoryProduct(item,pitem);
				      });

		      	     $('#shlist #trash').on('click', function(e){
		      	     	e.preventDefault();
		      	     	var itemid = ($(this).attr("data-itemid"));
		      	     	loadDeleteHistory(itemid);
		      	     })
			}else{
				console.log("no");
			}

		} // Success Function
	});

	$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
		});

	      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );
};

var loadDeleteHistory = function(itemid){
	console.log(itemid);
	$.ajax({
		url : '/php/removeSearchHistory.php',
		data : {
			id: itemid,
		},
		type : 'get',
		dataType : 'text',
		success : function(response) {
			console.log(response);
			if (response) {
				console.log('removed history item');
			} else {
				loadHistoryList()
				console.log('did not remove');
			}
		},
		error: function(response){
			console.log(response, 'hi');
		}
	});
};

var loadHistoryProduct = function(item,pitem){
	$('#wrap').empty();
	$.get('templates/template.html', function(htmlArg) {

	landingTemplate = htmlArg;

	var historyproduct = $(htmlArg).find('#historyproduct').html();
	$.template('historyproducttemplate', historyproduct);

	var html = $.render('', 'historyproducttemplate');

	$('#wrap').append(html);
	// console.log(item,pitem);
	getHistoryProduct(item,pitem);
});
};

var getHistoryProduct = function(item,pitem){
	 $('#historystatement').append(item);
     $('h2').append(pitem);

     if(item === ""){
      	$('#historystatement').html('Ingredients not available');
      	$('#historygluten').html('Ingredients not available');
      }

     if(item.indexOf("WHEAT") > -1){
      	$('#historygluten').css('color', 'red');
      	$('#historygluten').html('This product contains Gluten');
      }else if(item.indexOf("Rye") > -1){
      	$('#historygluten').css('color', 'red');
      	$('#historygluten').html('This product contains Gluten');
      }else if(item.indexOf("Barley") > -1){
      	$('#historygluten').css('color', 'red');
      	$('#bookmarkgluten').html('This product contains Gluten');
      }else if(item.indexOf("Oats") > -1){
      	$('#historygluten').css('color', 'red');
      	$('#historygluten').html('This product contains Gluten');
      }else if(item.indexOf("Wheat") > -1){
      	$('#historygluten').css('color', 'red');
      	$('#historygluten').html('This product contains Gluten');
      }else{
      	$('#historygluten').html('This product does not contain Gluten');
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

$('#historystatement').wrapInTag({
  tag: 'strong',
  words: ['wheat', 'Oats', 'rye', 'barley', 'gluten free', 'gluten']
});

$(document).on('click', '#logout', function(e) {
			console.log('clicks');
			e.preventDefault();
			logout();
});


      $('#space').html('<div class="logo"><p class="brand">Celiac Tracker</p></div>\
      		<input type="checkbox" id="clicker">\
			<label for="clicker"><img src="images/menu.png" id="menutwo"></label>\
				<nav>\
				<ul>\
					<li id="books">Bookmarks</li>\
					<li id="history">Search History</li>\
					<li id="logout">Logout</li>\
				</ul>\
			</nav>' );

}