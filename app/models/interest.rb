class Interest < ApplicationRecord
  has_and_belongs_to_many :users, join_table: :user_interests
  has_many :user_interests

  validates :title, uniqueness: true
end
