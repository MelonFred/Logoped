class HomePageController < ApplicationController

  def index
    @users = User.all
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
    @current_user = User.find_by("login = ? AND password = ?", params_login[:login], params_login[:password])
    if(@current_user)
      session[:user_id] = @current_user.id  
      redirect_to root_path
    else
      redirect_to root_path, notice: "Не правильно введен логин или пароль!"
    end
  end

  def logout
    session.clear
    redirect_to root_path
  end

  private
  def params_login
    params.require(:user).permit(:login, :password)
  end
end
