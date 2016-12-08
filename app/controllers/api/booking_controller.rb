class Api::BookingController < ApplicationController

  def display_itinerary

    selected_sessions = params["sessions"].split(',')

    all_sessions = [];

    selected_sessions.each do |session,index|

      session[:index]

      all_sessions =
      session_details = Session.find(session.to_i)

      response[:session_details] = session_details

      # session_details.speaker_name = params["speaker_name"]
      # session_details.venue = params["venue"]
      # session_details.talk_title = params["talk_title"]
      # session_details.talk_time = params["talk_time"]

    end


    render json: response
end

all_sessions = {
  1 {
    "name" => response[] "title,"speaker],}
  2:
  3:
}



end
