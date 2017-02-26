class AdminPageController < ApplicationController
    def index
        @users = User.includes(:tasks)
    end

    def user
    end

    def add_user
        @users = User.all
    end
end
