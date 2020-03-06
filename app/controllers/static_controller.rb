class StaticController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  private
  def authenticate_user!
    render :login and return unless current_user.present?
    super
  end
end
