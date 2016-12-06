class PagesController < ApplicationController

  Stripe.api_key = "sk_test_nCsPaxKQYyI5Hxn9sin0CkKY"

  def payment
    token = params[:stripeToken]
    raise '2341231231'
    render :payment
  end

end
