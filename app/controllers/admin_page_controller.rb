class AdminPageController < ApplicationController
    def index
        @users = User.includes(:tasks)
    end

    def user
    end

    def add
    end

    def add_user
        @users = User.all
    end
end
