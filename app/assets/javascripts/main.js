var displaySpeakers = function(response) {
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
    console.log($(event.target).data("id"));
    var selectedID = $(event.target).data("id");
    $.ajax({
      url: "/api/displayspeakers",
      method: "get"
    })
    .done(function(response) {
      var info = response;
      console.log("click on overlay:" + response);
      console.log(response)
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

}

$(document).ready(function() {

  $(document).on("keydown",function(e) {
  if (e.which == 27) {
    console.log('escape was hit!')
    $('.overlay').animate({width:'toggle'},1000);
    }
  })


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
  // Fix nav bar menu on top when scroll
  var twentyEms = Number(getComputedStyle(document.body, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]) * 20;
  $(window).scroll(function () {
   if ($(window).scrollTop() > twentyEms) {
     $('nav').addClass('nav-fixed');
   }
   if ($(window).scrollTop() < twentyEms) {
     $('nav').removeClass('nav-fixed');
   }
  });


  // button to close speaker info
  $('#close-window').on("click",function(e) {
    $('.overlay').animate({width:'toggle'},1000)
  })

  //tooltipped to drag session box
  $('.tooltipped').tooltip({delay: 50});

});
