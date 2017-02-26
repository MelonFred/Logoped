Rails.application.routes.draw do
  resources :home_page

  get 'home_page/index'
  post 'home_page/login'
  
  match '/logout', :via => [:DELETE], :to => "home_page#logout"
  match '/back', :via => [:DELETE], :to => "client_page#back"
  match '/task', :via => [:POST], :to => "client_page#task"
  match '/add_user', :via => [:GET], :to => "admin_page#add_user"
  match '/user', :via => [:POST], :to => "admin_page#user"
  match '/add', :via => [:POST], :to => "admin_page#add"

  root to: "home_page#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
