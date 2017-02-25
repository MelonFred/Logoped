class ClientPageController < ApplicationController
    def index
        @users = User.includes(:tasks)
    end

    def task
        @users = User.includes(:tasks)
        session[:task_id] = par_task
        redirect_to "/"
    end

    def tasks_list
    end

    def back
        session[:task_id].clear
        redirect_to "/"
    end

    private
    def par_task
        params[:id]
    end

end
