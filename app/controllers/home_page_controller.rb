class HomePageController < ApplicationController

  def index
    @users = User.includes(:tasks)
    if session[:user_id]
      per = @users.find(session[:user_id]).permission
      if per == "admin"
        render "admin_page/index"
      else  
        render "client_page/index"
      end
    end  
  end

  def login
    @current_user = User.where("login = ? AND password = ?", params_login[:login], params_login[:password])
    @current_user.each { |value| 
      session[:user_id] = value.id  
    }
    redirect_to root_path
  end

  def logout
    session.clear
    redirect_to root_path
  end

  def home
    redirect_to "/"
  end

  private
  def params_login
    params.require(:user).permit(:login, :password)
  end
end
