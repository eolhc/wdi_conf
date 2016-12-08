class ChargesController < ApplicationController

  # Set your secret key: remember to change this to your live secret key in production
  # See your keys here: https://dashboard.stripe.com/account/apikeys
  def create

    Stripe.api_key = "sk_test_iELhy6uC7yc8028vIjsLjN4t"

    # Get the credit card details submitted by the form
    token = params[:stripeToken]

    # Create a charge: this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => 45000, # Amount in cents ($450.00)
        :currency => "aud",
        :source => token,
        :description => "WDI Conf 2k16 - Ticket"
      )
    rescue Stripe::CardError => e
      # The card has been declined
    end

    # Check transaction
    if charge.status == 'succeeded'

      redirect_to :controller => 'attendee',
                  :action => 'create_attendee',
                  :method => 'post',
                  :first_name => params[:first_name],
                  :last_name => params[:last_name],
                  :email => params[:email],
                  :phone => params[:phone],
                  :sessions => params[:sessions]
    end
  end
end
