require "rails_helper"

RSpec.describe Interest, :type => :model do
  context "associations" do
    it { should have_and_belong_to_many(:users) }
  end

  context 'validations' do
    it { should validate_uniqueness_of(:title) }
  end
end
