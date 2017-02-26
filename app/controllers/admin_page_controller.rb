class AdminPageController < ApplicationController
    def index
        @users = User.all
    end

    def user
        @users = User.includes(:tasks)
        @current_user = User.find(param_id)
    end

    def add
        @user = User.new(params_add)
        @user.permission = "client"
        @user.save
        redirect_to(root_path)
    end

    def add_user
        @users = User.all
    end

    private
    def params_add
        params.require(:user).permit(:fio, :login, :password)
    end

    def param_id
        params[:id]
    end
end
