Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  post '/user_interests', to: 'user_interests#create', constraints: { format: 'json' }
  get '/user_interests/:query', to: 'user_interests#index', constraints: { format: 'json' }

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root to: 'static#index'
end
