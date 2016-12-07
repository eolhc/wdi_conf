class AttendeeController < ApplicationController

  def index

  end

  def new

    render :new
  end

  def create_attendee
    attendee = Attendee.new
    attendee.first_name = params[:first_name]
    attendee.last_name = params[:second_name]
    attendee.email = params[:email]
    attendee.phone = params[:phone]
    if attendee.save
      attendee_id = attendee.id
      create_booking(attendee_id)
      redirect_to '/'
    else
      render :new
    end
  end

  def create_booking(attendee_id)
    selected_sessions = params["sessions"].split(',')
    selected_sessions.each do |session|
      new_booking = Booking.new
      new_booking.attendee_id = attendee_id
      new_booking.session_id = session
      new_booking.save
    end
  end
end
