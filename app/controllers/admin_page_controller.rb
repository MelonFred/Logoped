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

    def add_user
        if session[:user_id] == 1
            @user = User.new(params_add_user)
            @user.permission = "client"
            @user.save
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    def add_user_view
        if session[:user_id] == 1
            @users = User.all
        else
            redirect_to root_path
        end
    end

    def add_task_view
        if session[:user_id] == 1
            @users = User.all
            @user_id = User.find(param_id).id
        else
            redirect_to root_path
        end
    end

    def add_task
        if session[:user_id] == 1
            @task = Task.new(params_add_task)
            @task.user_id = param_id
            @task.save
            redirect_to root_path
        else
            redirect_to root_path
        end
    end

    private
    def params_add_user
        params.require(:user).permit(:fio, :login, :password)
    end

    def params_add_task
        params.require(:task).permit(:title, :text)
    end

    def param_id
        params[:id]
    end
end
