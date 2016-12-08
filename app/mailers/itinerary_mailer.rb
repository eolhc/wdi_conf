class ItineraryMailer < ApplicationMailer
  default from: "wdiconf2k16@gmail.com"
  def sample_email(attendee)
      @attendee = attendee
      mail(to: @attendee.email, subject: 'Your WDIconf2K16 Itinerary')
    end
end
