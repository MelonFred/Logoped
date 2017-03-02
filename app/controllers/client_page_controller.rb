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
            if (@users.find(session[:user_id]).permission != "admin") && (@current_task.user_id != session[:user_id])
                redirect_to root_path
            end
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
