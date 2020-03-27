require "rails_helper"

RSpec.describe UserInterestsController, type: :controller do
  describe "Post create" do
    let!(:user) { FactoryBot.create(:user) }

    before(:each) { allow_any_instance_of( UserInterestsController ).to receive( :current_user ).and_return( user ) }

    context 'when the user interest is saveable' do
      it 'saves and returns a user interest' do
        expect{post :create, params: {user_interest: {title: 'asdf'}}}.to change{ user.interests.count }.by( 1 )
        expect(response.parsed_body['title']).to eq('asdf')
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
end
