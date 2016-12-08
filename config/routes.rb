Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#index"

  get "/api/displayspeakers", to: "api/session#getSession"

  post "/charges", to: "charges#create"
  get "/attendee", to: "attendee#create_attendee"
  get "/booking", to: "booking#create_booking"
  get "/success", to: "pages#success"

  get "/api/displayitinerary", to: "api/booking#displayItinerary"

end
