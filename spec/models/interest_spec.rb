require "rails_helper"

RSpec.describe Interest, :type => :model do
  context "associations" do
    it { should have_and_belong_to_many(:users) }
    it { should have_many(:user_interests) }
  end

  context "validations" do
     it { should validate_length_of(:title).is_at_least(1) }
  end
end
