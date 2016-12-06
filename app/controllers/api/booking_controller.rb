class Api::BookingController < ApplicationController

  def new
    # response = {
    #   :bookings => []
    # }

    selected_sessions = params["attendeeSessions"]
    selected_sessions.each do |session|

      new_booking = Booking.new
      new_booking.attendee_id = params["attendee"]
      new_booking.session_id = session
      new_booking.save

      # response[:attendee] << new_booking.id
    end

    attendee_id = params["attendee"]

    # render json: response
    render json: attendee_id
  end


end
