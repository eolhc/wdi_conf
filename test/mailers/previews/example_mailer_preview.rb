# Preview all emails at http://localhost:3000/rails/mailers/example_mailer
class ExampleMailerPreview < ActionMailer::Preview
  def sample_mail_preview
    IntineraryMailer.sample_email(Attendee.first)
  end
end
