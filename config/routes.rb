# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'qr_code_link/:id', to: 'qr_code_link#show', as: 'show_path'
  get 'qr_code_link/:id/scan', to: 'qr_code_link#scan', as: 'scan_path'
  post 'qr_code_link/:id/save_ndef_message', to: 'qr_code_link#save_ndef_message', as: 'save_ndef_message_path'
  get 'qr_code_link/:id/confirm', to: 'qr_code_link#confirm', as: 'confirm_path'
end
