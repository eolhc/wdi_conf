class PagesController < ApplicationController

  def success
    @sessions = params["sessions"]
    @attendee_id = params["attendee_id"]
    @attendee = Attendee.find(@attendee_id)
    render :success
  end

end
