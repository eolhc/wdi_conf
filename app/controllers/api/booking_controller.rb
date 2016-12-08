class Api::BookingController < ApplicationController

  def displayItinerary

    # selected_sessions = params["sessions"].split(',')
    #all _sessions = response
    # response = [];
    response = Session.all

    # selected_sessions.each do |session,index|
    #   session_details = Session.find(session.to_i)
    #   response[index] = {
    #     session_details.speaker_name = params[:speaker_name]
    #     session_details.venue = params[:venue]
    #     session_details.talk_title = params[:talk_title]
    #     session_details.talk_time = params[:talk_time]
    #   }
    # end

    render json: response
  end



end
