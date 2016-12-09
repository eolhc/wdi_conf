class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  default from: 'wdi2k16conf@gmail.com'
  layout 'mailer'
  def sample_email(attendee)
    @attendee = attendee
    mail(to: @attendee.email, subject: 'Your WDIconf2K16')
  end
end
