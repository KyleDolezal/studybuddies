require "rails_helper"

RSpec.describe UserSerializer do
  let!(:user) { FactoryBot.create(:user) }

  context 'serialization' do
    it 'contains email and id' do
      serializer = UserSerializer.new(user)
      expect(serializer.serializable_hash[:email]).to eq user.email
      expect(serializer.serializable_hash[:id]).to eq user.id
    end
  end
end
