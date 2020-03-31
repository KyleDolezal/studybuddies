require "rails_helper"

RSpec.describe UserInterestsController, type: :controller do
  describe "Post create" do
    let!(:user) { FactoryBot.create(:user) }

    before(:each) { allow_any_instance_of( UserInterestsController ).to receive( :current_user ).and_return( user ) }

    context 'when the user interest is saveable' do
      it 'saves and returns a user interest' do
        expect{post :create, params: {user_interest: {title: 'asdf'}}}.to change{ user.interests.count }.by( 1 )
        expect(response.parsed_body['data']['attributes']['user-id']).to eq(user.id)
      end
    end

    context 'when the user interest is unsaveable' do
      it 'does not create a new user interest' do
        post :create, params: {user_interest: {title: 'asdf'}}

        expect{post :create, params: {user_interest: {title: 'asdf'}}}.not_to change{ user.interests.count }
        expect(response.parsed_body['errors'][0]).to eq('Validation failed: Title has already been taken')
      end
    end
  end

  describe "get index" do
    let!(:user_interest) { FactoryBot.create(:user_interest) }
    let(:user)           { user_interest.user }
    let(:interest)       { user_interest.interest }

    before(:each) { allow_any_instance_of( UserInterestsController ).to receive( :current_user ).and_return( user ) }

    context 'when the query is for user' do
      it 'returns user interests for that user' do
        get :index, params: {query: "user_id=#{user.id}"}
        expect(response.parsed_body['data'][0]['id'].to_i).to eq(user_interest.id)
        expect(response.parsed_body['data'][0]['relationships']['user']['data']['id'].to_i).to eq(user.id)
        expect(response.parsed_body['data'][0]['relationships']['interest']['data']['id'].to_i).to eq(interest.id)
      end
    end

    context 'when the query is for interest' do
      it 'returns user interests for that user' do
        get :index, params: {query: "interest_id=#{interest.id}"}
        expect(response.parsed_body['data'][0]['id'].to_i).to eq(user_interest.id)
        expect(response.parsed_body['data'][0]['relationships']['user']['data']['id'].to_i).to eq(user.id)
        expect(response.parsed_body['data'][0]['relationships']['interest']['data']['id'].to_i).to eq(interest.id)
      end
    end

    context 'when the is not whitelisted' do
      it 'returns 422' do
        get :index, params: {query: "not whitelisted"}
        expect(response.status).to eq(422)
      end
    end
  end
end
