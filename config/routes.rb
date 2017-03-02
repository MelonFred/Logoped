Rails.application.routes.draw do
  resources :home_page

  get 'home_page/index'
  post 'home_page/login'
  
  match '/logout', :via => [:DELETE], :to => "home_page#logout"
  match '/home', :via => [:DELETE], :to => "home_page#home"
  match '/add_user_view', :via => [:GET], :to => "admin_page#add_user_view"
  match '/add_user', :via => [:POST], :to => "admin_page#add_user"
  match '/add_task_view', :via => [:GET], :to => "admin_page#add_task_view"
  match '/add_task', :via => [:POST], :to => "admin_page#add_task"

  get '/user/:id', to: 'admin_page#user'  
  get '/task/:id', to: 'client_page#task' 
  get '/add_task_view/:id', to: 'admin_page#add_task_view'  

  root to: "home_page#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
