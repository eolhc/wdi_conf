class AttendeeController < ApplicationController

  def index

  end

  def new

    render :new
  end

  def create
    attendee = Attendee.new
    attendee.first_name = params[:first_name]
    attendee.last_name = params[:second_name]
    attendee.email = params[:email]
    attendee.phone = params[:phone]
    raise issue
    if attendee.save
      redirect_to '/'
    else
      render :new
    end
  end
end
