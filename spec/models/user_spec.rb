require "rails_helper"

RSpec.describe User, :type => :model do
  context "associations" do
    it { should have_and_belong_to_many(:interests) }
  end
end
