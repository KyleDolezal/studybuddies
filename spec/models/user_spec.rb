require "rails_helper"

RSpec.describe User, :type => :model do
  context "associations" do
    it { should have_and_belong_to_many(:interests) }
    it { should have_many(:user_interests) }
  end
end
