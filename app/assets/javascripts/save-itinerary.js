
$(document).ready(function() {
  // When user select sessions and click book tickets
  $('.submit-itinerary').click(function() {
    var source = $("#attendee-form").html();
    var template = Handlebars.compile(source);

    // Add template into form
    $('.attendee-form').append(template())

    // add button to close payment form
    $('#payment-form').append("<i class='fa fa-window-close' id='close-payment-btn'>");

    // Click Close Payment
    $('#close-payment-btn').on("click",function(e) {
      console.log('hi')
      $('.attendee-form').empty();
    })

    //Add Event listener on the form submission
    $(function() {

      var $form = $('#payment-form');

      $form.submit(function(event) {
        // Disable the submit button to prevent repeated clicks:
        $form.find('.submit').prop('disabled', true);

        // Request a token from Stripe:
        Stripe.card.createToken($form, stripeResponseHandler);
        console.log(stripeResponseHandler)

        // Prevent the form from being submitted:
        return false;
      });
    });

    //Gram info from form, request token to Stripe API
    function stripeResponseHandler(status, response) {
      // Grab the form:
      var $form = $('#payment-form');

      if (response.error) { // Problem!

        // Show the errors on the form:
        $form.find('.payment-errors').text(response.error.message);
        $form.find('.submit').prop('disabled', false); // Re-enable submission

      } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token ID into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken">').val(token));

        //pedro - testing get sessions from itinerary
        $form.append($('<input type="hidden" name="sessions">').val( getSessions() ));

        // Submit the form:
        $form.get(0).submit()

      }
    };

  })

  // Search all the sessions dropped into the schedule
  function getSessions() {

    var timeslots = $('.timeslot')
    var selectedSessions = []

    for (var i = 0; i < timeslots.length; i++) {
      if (timeslots[i].children[2]) {
        selectedSessions.push($('.timeslot')[i].children[2].getAttribute('data-id'));
      }
    }
    return selectedSessions
  }

})
