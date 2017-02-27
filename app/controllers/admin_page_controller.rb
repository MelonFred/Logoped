class AdminPageController < ApplicationController
    
    def index
        if session[:user_id] == 1
            @users = User.all
        else
            redirect_to root_path
        end
    end

    def user
        if session[:user_id] == 1
            @users = User.includes(:tasks)
            @current_user = User.find(param_id)
        else
            redirect_to root_path
        end
    end

    def add
        if session[:user_id] == 1
            @user = User.new(params_add)
            @user.permission = "client"
            @user.save
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    def add_user
        if session[:user_id] == 1
            @users = User.all
        else
            redirect_to root_path
        end
    end

    private
    def params_add
        params.require(:user).permit(:fio, :login, :password)
    end

    def param_id
        params[:id]
    end
end
