FactoryBot.define do
  factory :user_interest do
    user {FactoryBot.create(:user)}
    interest {FactoryBot.create(:interest)}
  end
end
