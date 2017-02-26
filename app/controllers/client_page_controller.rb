class ClientPageController < ApplicationController
    def index
        @users = User.includes(:tasks)
    end

    def task
        @users = User.includes(:tasks)
        @current_task = Task.find(par_task)
    end

    def tasks_list
    end

    def back
        redirect_to "/"
    end

    private
    def par_task
        params[:id]
    end

end
