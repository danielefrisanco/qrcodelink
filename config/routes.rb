# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'qr_code_link/index', to: 'qr_code_link#index', as: 'index_path'
      get 'show/:id', to: 'qr_code_link#show', as: 'show_path'
      post 'save_ndef_message/:id/', to: 'qr_code_link#save_ndef_message', as: 'save_ndef_message_path'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
