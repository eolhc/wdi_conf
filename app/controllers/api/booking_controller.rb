class Api::BookingController < ApplicationController

  def displayItinerary

    selected_sessions = params["sessionID"]
    #all _sessions = response
    all_sessions = [];
    # response = selected_sessions

    selected_sessions.each do |session|
      timeslot = {}

      session_details = Session.find(session.to_i)

      timeslot["speaker_name"] = session_details.speaker_name
      timeslot["talk_title"] = session_details.talk_title
      timeslot["talk_time"] = session_details.talk_time
      # timeslot["venue"] = session_details.venue

      all_sessions << timeslot
    end

    render json: all_sessions
  end
#
# session1 = {
#   speaker_name: "name",
#   talk_title: "talk_title"
# }

end
