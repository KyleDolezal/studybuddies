require "rails_helper"

RSpec.describe InterestSerializer do
  let!(:interest) { FactoryBot.create(:interest) }

  context 'serialization' do
    it 'contains title and id' do
      serializer = InterestSerializer.new(interest)
      expect(serializer.serializable_hash[:title]).to eq interest.title
      expect(serializer.serializable_hash[:id]).to eq interest.id
    end
  end
end
