class UserInterest < ApplicationRecord
  belongs_to :interest
  belongs_to :user

  validates :user_id, uniqueness: { scope: :interest_id, message: 'has already created an interest with this title' }
end
