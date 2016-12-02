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
  })


//display slots for the itinerary
var times = [9, 10, 11, 1, 2, 3, 4]
var source = $("#timeslot").html();
var template = Handlebars.compile(source);
for (var i = 0; i < times.length; i++) {
  timeslot = {
    talktime: times[i]
  }
  $(".itinerary").append(template(timeslot))
  }

})
