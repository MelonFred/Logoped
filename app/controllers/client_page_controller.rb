class ClientPageController < ApplicationController
    def index
        if session[:user_id]
           @users = User.includes(:tasks)
        else
            redirect_to root_path
        end
    end

    def task
        if session[:user_id]
            @users = User.includes(:tasks)
            @current_task = Task.find(par_task)
        else
            redirect_to root_path
        end
    end

    def tasks_list

    end

    private
    def par_task
        params[:id]
    end

end
