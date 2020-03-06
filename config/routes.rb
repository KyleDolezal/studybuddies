Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root to: 'static#index'
end
