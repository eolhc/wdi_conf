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
})

if ($('.timeslot').attr("time",12)) {
  $('.timeslot').css("background-color","red")
}
