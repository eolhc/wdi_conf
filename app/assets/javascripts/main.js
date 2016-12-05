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
        sessionid: sessions[i].id,
        speakerimg: sessions[i].speaker_img,
        speakername: sessions[i].speaker_name,
        talktitle: sessions[i].talk_title,
        talktime: sessions[i].talk_time,
        venue: sessions[i].venue.split(' ').join('-')
      }
      $(".speakers").append(template(speaker))
    }
    //display speakers in order
    $(".speakers").find('.session-box').sort(function (a, b) {
     return +a.getAttribute('time') - +b.getAttribute('time')
     })
     .appendTo(".speakers");

     //ensure instructions are displaying
     $('.instructions').show()
     $('.steps-btn').on("click",function(e) {
       event.preventDefault();
       $('.instructions').fadeOut("slow");
     })
     $('#close-window').on("click",function(e) {
       event.preventDefault();
       $('.overlay').fadeOut("slow");
     })
    // Make 'session-box' Draggable and set properties
    $(".session-box").draggable({
      start: function(e, ui){
        $(ui.helper).addClass("ui-draggable-helper");
      },
      helper: 'clone',
      //revert: true,
      cursor: 'move',
      // stop: function(event, ui) {
      //     $(ui.helper).revert('true')
      // }
      // revert: function(event){
      //   var slotTime = $(this).attr('time')
      //   var cardTime = event.attr('time')
      //   if (slotTime != cardTime) return true
      // }

    })
    .click(function(event) {
      $('.info').empty();
      console.log($(event.target).data("id"))
      var selectedID = $(event.target).data("id");
      $.ajax({
        url: "/api/displayspeakers",
        method: "get"
      })
      .done(function(response) {
        var info = response;
        var source = $("#overlay").html();
        var template = Handlebars.compile(source);

        //using ID of speaker in little box
        //get session details
        details = {
          speakerimg: info[selectedID-1].speaker_img,
          speakername: info[selectedID-1].speaker_name,
          talktitle: info[selectedID-1].talk_title,
          speakerdesc: info[selectedID-1].speaker_desc,
          talkdesc: info[selectedID-1].talk_desc
        }
        $(".info").append(template(details))

      })
      // $('.overlay').toggle();

      $('.overlay').animate({width:'toggle'},1000);

      })


    })



    $(document).on("keydown",function(e) {
    if (e.which == 27) {
      console.log('escape was hit!')
      $('.overlay').animate({width:'toggle'},1000);
      }
    })



  //display slots for the itinerary
  var times = [9, 10, 11, 12, 13, 14, 15, 16]
  var innertext = ["9:00","10:00","11:00","L U N C H","13:00","14:00","15:00","16:00"]
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
    hoverClass: hoverTimeslot,
    out: function(){
      $(this).css("background-color","")
    },
    tolerance: "pointer",

    drop: placeSession
    // scope: function() {
    //   this.attr('time')
    // }
  })

  function hoverTimeslot( event, ui ) {
    var slotTime = $(this).attr('time')
    var cardTime = $('.ui-draggable-helper').attr('time')
    if ( slotTime == cardTime ) {
      return 'correct'
    }else {
      return 'wrong'
    }
  }


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
      //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      //ui.draggable.draggable( 'option', 'revert', false );


      //take text within the session box that was selected for dragging
      //ui.draggable.html()
      //put text within the timeslot that it was dragged into
      $(this).html(
        ui.draggable.html()
        + '<p>'
        +'Location: '
        + ui.draggable.attr('venue').split('-').join(' ')
        + '</p>'
      )
      .css({
        "text-align": "left",
      });

      $(this).find("p").css({
        "margin-left": "7em",
        "margin-top": "0em",
        "margin-bottom": "0em"
      })
      // return false;
    }else {
      // return true;
    }
  }

  //scrolling menu
  $("#myTopnav li").click(function(){
    scrollTo($(this).data('location'));
  });
  //scrollTo($("#sponsors"));

  function scrollTo(element){
    $('html, body').animate({
      scrollTop: $(element).offset().top
    },  1000);
  }
  // fixed nav abr menu
  var twentyEms = Number(getComputedStyle(document.body, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]) * 20;
  $(window).scroll(function () {
   if ($(window).scrollTop() > twentyEms) {
     $('nav').addClass('nav-fixed');
   }
   if ($(window).scrollTop() < twentyEms) {
     $('nav').removeClass('nav-fixed');
   }
 });


  //display individual profile
  $('#close-window').on("click",function(e) {
    $('.overlay').animate({width:'toggle'},1000)
  })
})
