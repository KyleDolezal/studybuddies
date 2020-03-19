class StaticController < ApplicationController
  before_action :check_login_status

  def index
  end

  private
  def check_login_status
    @user = current_user
    render :index, status: 401 unless @user.present?
  end
end
