class PagesController < ApplicationController

  def success
    @sessions = params["sessions"]
    @attendee_id = params["attendee_id"]
    attendee = Attendee.find(@attendee_id)

    create(attendee)
    render :success
  end

# To trigger the event that will send an email to an attendee.
  def create (attendee)

    # respond_to do |format|

      # Sends email to user when user is created.
      ItineraryMailer.sample_email(attendee).deliver_now

      #
      # format.html { redirect_to attendee, notice: 'Attendee was successfully created.' }
      # format.json { render :show, status: :created, location: attendee }
    # else
    #   format.html { render :new }
    #   format.json { render json: @attendee.errors, status: :unprocessable_entity }
    # end
  end
end
