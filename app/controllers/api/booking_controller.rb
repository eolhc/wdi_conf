class Api::BookingController < ApplicationController

  def display_itinerary

    selected_sessions = params["sessions"].split(',')
    selected_sessions.each do |session|
      session_details = Session.find(session.to_i)
      response[]
      # session_details.speaker_name = params["speaker_name"]
      # session_details.venue = params["venue"]
      # session_details.talk_title = params["talk_title"]
      # session_details.talk_time = params["talk_time"]

    end


    render json: sessions
  end

end
