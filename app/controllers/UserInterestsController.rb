class UserInterestsController < ApplicationController
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordInvalid do |exception|
    set_headers
    render json: {errors: [exception.message]}, status: 422
  end

  def create
    user_interest = UserInterest.create(user: current_user,
                      interest: Interest.create!(interest_params))

    render json: UserInterestSerializer.new(user_interest),
      adapter: :json_api, include: [:user, :interest]
  end

  private
  def interest_params
    params.require(:user_interest).permit(:title)
  end
end
