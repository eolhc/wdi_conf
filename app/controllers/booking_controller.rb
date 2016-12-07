class BookingController < ApplicationController
#want this for posting a booking to database

  def create_booking
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
        else
          redirect_to '/'
        end
    end


  end


end
