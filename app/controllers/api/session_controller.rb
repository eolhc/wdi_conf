class Api::SessionController < ApplicationController

  def getSession
    sessions = Session.all
    render json: sessions
  end

end
