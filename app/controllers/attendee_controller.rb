class AttendeeController < ApplicationController

  def index

  end

  def new
    render :new
  end

  def create_attendee
    attendee = Attendee.new
    attendee.first_name = params[:first_name]
    attendee.last_name = params[:last_name]
    attendee.email = params[:email]
    attendee.phone = params[:phone]
    if attendee.save
      redirect_to :controller => 'booking',
                  :action => 'create_booking',
                  :method => 'post',
                  :attendee_id => attendee.id,
                  :sessions => params[:sessions]
    else
      render :new
    end
  end


end
