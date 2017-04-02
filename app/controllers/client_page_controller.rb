class ClientPageController < ApplicationController
    def index
        if session[:user_id]
           @users = User.all
           @user_lessons = User_lesson.all
        else
            redirect_to root_path
        end
    end

    def lesson
        if session[:user_id]
            @user_lesson = User_lesson.find_by user_id: session[:user_id], lesson_id: param_id
            if (@user_lesson)
                @current_lesson = Lesson.find(param_id)
                @task = Task.all
            else
                redirect_to root_path
            end
        else
            redirect_to root_path
        end
    end

    def lessons_list

    end

    def task
        if session[:user_id]
            @users = User.all
            @current_task = Task.find(param_id)
            if ()
                redirect_to root_path
            end
        else
            redirect_to root_path
        end
    end

    private
    def param_id
        params[:id]
    end

end
