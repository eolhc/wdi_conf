class BookingController < ApplicationController
#want this for posting a booking to database

  def create_booking

    saved_sessions = []
    not_saved_sessions = []
    selected_sessions = params["sessions"].split(',')
    selected_sessions.each do |session|
      new_booking = Booking.new
      new_booking.attendee_id = params["attendee_id"]
      new_booking.session_id = session

        if new_booking.save

          redirect_to :controller => 'pages',
                      :action => 'success',
                      :attendee_id => params["attendee_id"],
                      :sessions => params[:sessions]
          saved_sessions << new_booking.session_id.to_s
        else
          not_saved_sessions << new_booking.session_id
        end
    end
    if selected_sessions == saved_sessions
      redirect_to :controller => 'pages',
      :action => 'success',
      :attendee_id => params["attendee_id"],
      :sessions => params[:sessions]
    else
      raise issue
      redirect_to '/'
    end
  end


end
