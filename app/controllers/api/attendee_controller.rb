class Api::AttendeesController < ApplicationController

  def new

  end
  def create
    attendee = Attende.new
    attende.first_name = params[:first_name]
    attende.last_name = params[:second_name]
    attende.email = params[:email]
    attende.phone = params[:phone]

    if attende.save
      redirect_to '/'
    else
      render :new
    end
  end
end
