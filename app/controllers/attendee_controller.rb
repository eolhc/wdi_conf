class AttendeeController < ApplicationController

  def index

  end

  def new
    render :new
  end

  def create_attendee
    attendee = Attendee.new
    attendee.first_name = params[:first_name]
    attendee.last_name = params[:second_name]
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

# To trigger the event that will send an email to an attendee.
def create
  @attendee = Attendee.new(user_params)

  respond_to do |format|
    if @attendee.save

      # Sends email to user when user is created.
      ExampleMailer.sample_email(@attendee).deliver

      format.html { redirect_to @attendee, notice: 'Attendee was successfully created.' }
      format.json { render :show, status: :created, location: @attendee }
    else
      format.html { render :new }
      format.json { render json: @attendee.errors, status: :unprocessable_entity }
    end
  end
end
