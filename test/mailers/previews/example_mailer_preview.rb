# Preview all emails at http://localhost:3000/rails/mailers/example_mailer
class ItineraryMailerPreview < ActionMailer::Preview
  def sample_mail_preview
    ItineraryMailer.sample_email(Attendee.last)
  end
end
