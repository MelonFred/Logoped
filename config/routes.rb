Rails.application.routes.draw do
  resources :home_page

  get 'home_page/index'
  post 'home_page/login'
  
  match '/logout', :via => [:DELETE], :to => "home_page#logout"
  match '/add_user_view', :via => [:GET], :to => "admin_page#add_user_view"
  match '/add_user', :via => [:POST], :to => "admin_page#add_user"
  match '/user', :via => [:GET], :to => "admin_page#user"
  match '/user_list', :via => [:GET], :to => "admin_page#user_list"
  match '/all_tasks', :via => [:GET], :to => "admin_page#all_tasks"
  match '/task_category', :via => [:GET], :to => "admin_page#task_category"
  match '/task_subcategory', :via => [:GET], :to => "admin_page#task_subcategory"
  match '/all_lessons', :via => [:GET], :to => "admin_page#all_lessons"
  match '/add_task_view', :via => [:GET], :to => "admin_page#add_task_view"
  match '/add_lesson_view', :via => [:GET], :to => "admin_page#add_lesson_view"
  match '/add_task', :via => [:POST], :to => "admin_page#add_task"
  match '/add_lesson', :via => [:POST], :to => "admin_page#add_lesson"
  match '/add_lesson_for_user', :via => [:POST], :to => "admin_page#add_lesson_for_user"
  

  get '/user/:id', to: 'admin_page#user'  
  get '/task/:id', to: 'admin_page#task' 
  get '/lesson/:id', to: 'admin_page#lesson'
  get '/add_task_view/:id', to: 'admin_page#add_task_view'
  get '/task_subcategory/:category', to: 'admin_page#task_subcategory' 
  get '/all_tasks/:category/:subcategory', to: 'admin_page#all_tasks' 
  get '/add_lesson_for_user_form/:id', to: 'admin_page#add_lesson_for_user_form'
  get '/user_lesson/:id', to: 'client_page#user_lesson'
  get '/user_task/:id', to: 'client_page#user_task' 

  root to: "home_page#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
