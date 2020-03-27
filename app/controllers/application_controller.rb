class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  protected
  def set_headers
    response.headers['access-token'] = request.headers['access-token']
    response.headers['client'] = request.headers['client']
    response.headers['expiry'] = request.headers['expiry']
    response.headers['uid'] = request.headers['uid']
  end
end
