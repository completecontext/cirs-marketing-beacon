$( document ).ready(function() {

	$('#main-nav-toggle').on('click', function() {
		$('#main-nav-container').toggleClass('nav-open');
		$('#main-nav').toggleClass('nav-open');
		$('#main-nav-toggle .oi').toggleClass(['oi-chevron-bottom','oi-chevron-top']);
	});

	$('#main-nav a').on('click', function() {
		$('#main-nav-toggle').trigger('click');
	});

	$('#submit-form').on('click', function() {
		validateContactForm('#contact-form');
	});

});

function validateContactForm(form) {

	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 2
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter(element);
		},
		submitHandler: function() {
			submitContactForm(form);
		}
	});

}

function submitContactForm(form) {

	$('#submit-form').attr('value','Processing...');

	let formData = $(form).serializeArray();

	gtag('event', 'contact_form_submission', {
	  'event_category' : 'user_engagement',
	  'event_label' : 'Contact form submission from ' + formData[1].value
	});

	// Netlify Forms: static-hosted forms are handled by posting the
	// form-encoded body (including form-name) to any path — Netlify's
	// build-time HTML scan is what wires this form up server-side, not
	// this endpoint. No backend of our own needed.
	$.ajax({
		type: "POST",
		url: "/",
		data: formData,
		cache: false,
		success: function(result){
			$('#form-wrapper').hide();
			$('#thank-you').show();
		}
	});
	
}