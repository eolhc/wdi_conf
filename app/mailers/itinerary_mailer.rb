class ItineraryMailer < ApplicationMailer
  default from: "wdi2k16conf@gmail.com"
  def sample_email(attendee)
      @attendee = attendee
      # sessions = []
      # attendee.bookings.each do |booking|
      #   sessions << booking.session_id
      # end
      #
      # sessions.each do |session|
      #   @selected_session = Session.find(session)
      #   @speaker_name = selected_session.speaker_name
      #   @talk_title = selected_session.talk_title
      #   @talk_time = selected_session.talk_time
      #   @venue = selected_session.venue
      # end

      mail(to: @attendee.email, subject: 'Your WDI2K16conf Itinerary')
  end
end
