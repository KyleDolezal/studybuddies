class UserInterestsController < ApplicationController
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordInvalid do |exception|
    set_headers
    render json: {errors: [exception.message]}, status: 422
  end

  def create
    render json: current_user.interests.create!(user_interest_params)
  end

  private
  def user_interest_params
    params.require(:user_interest).permit(:title)
  end
end
