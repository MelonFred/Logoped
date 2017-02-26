Rails.application.routes.draw do
  resources :home_page

  get 'home_page/index'
  post 'home_page/login'
  
  match '/logout', :via => [:DELETE], :to => "home_page#logout"
  match '/back', :via => [:DELETE], :to => "home_page#back"
  match '/home', :via => [:DELETE], :to => "home_page#home"
  match '/add_user', :via => [:GET], :to => "admin_page#add_user"
  match '/add', :via => [:POST], :to => "admin_page#add"

  get '/user/:id', to: 'admin_page#user'  
  get '/task/:id', to: 'client_page#task' 

  root to: "home_page#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
