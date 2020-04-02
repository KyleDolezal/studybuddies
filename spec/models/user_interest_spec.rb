require "rails_helper"

RSpec.describe UserInterest, :type => :model do
  context "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:interest) }
  end


  context 'validations' do
    it { should validate_uniqueness_of(:user_id).scoped_to(:interest_id) }
  end
end
