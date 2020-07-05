$(document).ready(function() {
	// Add a button click listener
	$('button').on('click', function(event){
		// When the button is clicked, 
		// prevent the default actio
		event.preventDefault();
		// capture the button in the variable
		var element = $(this);
		// Add a jQuery ajax function
		$.ajax({
			// Called when button is clicked
			url: '/like/',
			// The type of request
			type: 'POST',
			// Information to be passed to the view
			// Get the data-id of the clicked button
			data: { 
				treasure_id : element.attr("data-id")
			},
			// Capture the returned number of likes from the like view
			success: function(response){
				// Update the button with the new number of likes
				element.html('Likes ' + response);
			}
		});
	});
});

// using jQuery, takes care of the csrf_token passed to the form
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
	// these HTTP methods do not require CSRF protection
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
	beforeSend: function(xhr, settings) {
		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	}
});