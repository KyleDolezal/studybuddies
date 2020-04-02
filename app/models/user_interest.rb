class UserInterest < ApplicationRecord
  belongs_to :interest
  belongs_to :user

  validates :user_id, uniqueness: { scope: :interest_id }
end
