class PagesController < ApplicationController

  def success
    @sessions = params["sessions"]
    @attendee_id = params["attendee_id"]
  end

end
