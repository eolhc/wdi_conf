class Api::AttendeeController < ApplicationController

  def new
    attendee = Attendee.new
    attendee.first_name = params["first_name"]
    attendee.last_name = params["second_name"]
    attendee.email = params["email"]
    attendee.phone = params["phone"]
    attendee.save

    attendee_id = attendee.id
    render json: attendee_id
  end

end
