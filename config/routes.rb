Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#index"

  get "/api/displayspeakers", to: "api/session#getSession"

  post "/api/attendee/new", to: "api/attendee#new"
  post "/api/submitbooking", to: "api/booking#new"


end
