class PagesController < ApplicationController

  def success
    @sessions = params["sessions"]
    @attendee_id = params["attendee_id"]
    @attendee = Attendee.find(@attendee_id)
    render :success
  end

end


# To trigger the event that will send an email to an attendee.
def create
  @attendee = Attendee.new(user_params)

  respond_to do |format|
    if @attendee.save

      # Sends email to user when user is created.
      ItineraryMailer.sample_email(@attendee).deliver

      format.html { redirect_to @attendee, notice: 'Attendee was successfully created.' }
      format.json { render :show, status: :created, location: @attendee }
    else
      format.html { render :new }
      format.json { render json: @attendee.errors, status: :unprocessable_entity }
    end
  end
end
