
$(document).ready(function() {

  $('.submit-itinerary').click(function() {
    var source = $("#attendee-form").html();
    var template = Handlebars.compile(source);
    $('.attendee-form').append(template())
    // .append($("<button>",{
    //     id: 'checkout-btn',
    //     text: "Checkout"
    //   })
    // );
    //
    // $('#checkout-btn').click(function() {
    //   console.log('booking button clicked')
    //   getSessions();
    // });

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


        // Submit the form:
        $form.get(0).submit();
        // getSessions(token)
        console.log(token)

      }
    };

  })

  function getSessions(token) {

    var timeslots = $('.timeslot')
    var selectedSessions = []

    for (var i = 0; i < timeslots.length; i++) {
      if (timeslots[i].children[2]) {
        selectedSessions.push($('.timeslot')[i].children[2].getAttribute('data-id'));
      }
    }

    newAttendee(selectedSessions, token)
    console.log(selectedSessions)
  }

  function newAttendee(selectedSessions, token) {
    attendeeData = {
      first_name: $('.first_name').val(),
      last_name: $('.last_name').val(),
      email: $('.email').val(),
      phone: $('.phone').val()
    }
    $.ajax({
      url: '/api/attendee/new',
      method: 'post',
      data: attendeeData
    }).done(function(response){
      data = {
        token: token,
        attendee: response,
        attendeeSessions: selectedSessions
      }
      console.log(data)
      submitBooking(data)
    })
  }

  function submitBooking(data) {
    $.ajax({
      url: '/api/submitbooking',
      method: 'post',
      data: data
    }).done(function(response) {
      console.log("booking was submitted WITH ATTENDEE ID:"+response)
    })
  }

})
