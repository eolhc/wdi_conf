$(document).ready(function() {

    //display all the speakers
  $.ajax({
    url: "/api/displayspeakers",
    method: "get"
  })
  .done(function(response) {
    console.log(response)
    var sessions = response;
    var source = $("#session-box").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < sessions.length; i++) {
      speaker = {
        speakerimg: sessions[i].speaker_img,
        speakername: sessions[i].speaker_name,
        talktitle: sessions[i].talk_title,
        talktime: sessions[i].talk_time,
      }
      $(".speakers").append(template(speaker))
    }

    // Make 'session-box' Draggable and set properties
    $(".session-box").draggable({
      // containment: '#timeslot',
      // stack: '#cardPile div',
      cursor: 'move',
      revert: function(event){
        var slotTime = $(this).attr('time')
        var cardTime = event.attr('time')
        if (slotTime != cardTime) return true
      }
      // scope: function() {
      //   this.attr('time')
      // }
    })
  })

  //display slots for the itinerary
  var times = [9, 10, 11, 12, 1, 2, 3, 4]
  var innertext = ["9:00am","10:00am","11:00am","L U N C H","1:00pm","2:00pm","3:00pm","4:00pm"]
  var source = $("#timeslot").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < times.length; i++) {
    timeslot = {
      talktime: times[i],
      text: innertext[i]
    }
    $(".itinerary").append(template(timeslot))
  }


  // Make 'timeslot' Draggable and set properties
  $(".timeslot").droppable({
    drop: placeSession,
    hoverClass: 'hoverTimeslot',
    // scope: function() {
    //   this.attr('time')
    // }
  })


  function placeSession( event, ui ) {
    var slotTime = $(this).attr('time')
    var cardTime = ui.draggable.attr('time')

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotTime == cardTime ) {
      //ui.draggable.addClass( 'correct' );
      //ui.draggable.draggable( 'disable' );
      //$(this).droppable( 'disable' );
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      //ui.draggable.draggable( 'option', 'revert', false );


      //take text within the session box that was selected for dragging
      //put text within the timeslot that it was dragged into
      return false;
    }else {
      return true;
    }
  }
})
