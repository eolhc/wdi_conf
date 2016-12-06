
$(document).ready(function() {

  $('.submit-itinerary').click(function() {
    var source = $("#attendee-form").html();
    var template = Handlebars.compile(source);
    $('.attendee-form').append(template())
    .append($("<button>",{
        id: 'book-btn',
        text: "Submit Payment"
      })
    );
    $('#book-btn').click(function() {
      console.log('booking button clicked')
      getSessions();
    });
  })

  function getSessions() {

    var timeslots = $('.timeslot')
    var selectedSessions = []

    for (var i = 0; i < timeslots.length; i++) {
      if (timeslots[i].children[2]) {
        selectedSessions.push($('.timeslot')[i].children[2].getAttribute('data-id'));
      }
    }

    newAttendee(selectedSessions)
    console.log(selectedSessions)
  }

  function newAttendee(selectedSessions) {
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
