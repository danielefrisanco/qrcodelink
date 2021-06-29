Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'qr_code_link/:id', to:'qr_code_link#show'
  get 'qr_code_link/scan/:id', to:'qr_code_link#scan', as: 'scan_path'

end
