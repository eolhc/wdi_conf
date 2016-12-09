class ItineraryMailer < ApplicationMailer
  default from: "wdi2k16conf@gmail.com"
  def sample_email(attendee)
      @attendee = attendee
      mail(to: @attendee.email, subject: 'Your WDI2K16conf Itinerary')
  end
end
