class AttendeesController < ApplicationController

  def new

  end
  def create
    attendee = Attendee.new
    attendee.first_name = params[:first_name]
    attendee.last_name = params[:second_name]
    attendee.email = params[:email]
    attendee.phone = params[:phone]

    if attendee.save
      redirect_to '/'
    else
      render :new
    end
  end
end
