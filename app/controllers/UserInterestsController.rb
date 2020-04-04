class UserInterestsController < ApplicationController
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordInvalid do |exception|
    set_headers
    render json: {errors: [exception.message]}, status: 422
  end

  rescue_from ArgumentError do |exception|
    render json: {errors: [title: 'You must provide a proper query']}, status: 422
  end

  def create
    begin
      interest = Interest.create!(interest_params)
    rescue ActiveRecord::RecordNotUnique
      interest = Interest.find_by(interest_params)
    end

    user_interest = UserInterest.create!(user: current_user,
                      interest: interest)

    render json: UserInterestSerializer.new(user_interest),
      adapter: :json_api, include: [:user, :interest]
  end

  def index
    render json: UserInterest.
                  where("#{get_whitelisted_query[:table]} IN (?)", get_whitelisted_query[:value]).
                  includes(:user, :interest),
                  adapter: :json_api, include: [:user, :interest]
  end

  private
  def interest_params
    params.require(:user_interest).permit(:title)
  end

  def get_whitelisted_query
    query_for = params[:query]&.split("=")[0]
    value     = params[:query]&.split("=")[1]
      arrayVal  = (value || '').split(',')
    raise ArgumentError unless ['user_id', 'interest_id'].include?(query_for)
    {table: query_for, value: arrayVal}
  end
end
