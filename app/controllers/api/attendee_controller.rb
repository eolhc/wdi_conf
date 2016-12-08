class Api::AttendeeController < ApplicationController

  def displayattendee
    attendee_id = params["attendeeID"]

    attendee = Attendee.find(attendee_id.to_i)

    details = {}

    details["first_name"] = attendee.first_name
    details["last_name"] = attendee.last_name
    details["email"] = attendee.email

    render json: details
  end

end
