
  $('.submit-itinerary').click(displayForm())
  //ON CLICK I WANT A FORM TO DISPLAY
  //APPEND BELOW ITINERARY
  function displayForm() {
    var source = $("#attendee-form").html();
    var template = Handlebars.compile(source);
    $('.attendee-form').append(template())
  }

  //then i want to create an attendee
  //then i want to take the sessions selectedSessions
  //and create a booking

  $('.book-btn').click(getSessions());

  function getSessions() {
    console.log('hello')

    var timeslots = $('.timeslot')
    var selectedSessions = []

    for (var i = 0; i < timeslots.length; i++) {
      if (timeslots[i].children[2]) {
        selectedSessions.push($('.timeslot')[i].children[2].getAttribute('data-id'));
      }
    }
    newAttendee(selectedSessions)
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
      console.log(response)
    })
  }
