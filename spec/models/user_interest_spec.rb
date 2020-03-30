require "rails_helper"

RSpec.describe UserInterest, :type => :model do
  context "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:interest) }
  end
end
