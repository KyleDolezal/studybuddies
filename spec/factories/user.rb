FactoryBot.define do
  factory :user do
    email {"email@asdf.com"}
    password {'password'}
    password_confirmation {'password'}
  end
end
