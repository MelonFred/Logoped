class ClientPageController < ApplicationController
    def index
        if session[:user_id]
            @users = User.all
        else
            redirect_to root_path
        end
    end

    def user_lesson
        if session[:user_id]
            @user_lesson = UserLesson.find_by(user_id: session[:user_id], lesson_id: param_id)
            if (@user_lesson)
                @current_lesson = Lesson.find(param_id)
                @tasks = Task.find(@current_lesson.tasks_id)
            else
                redirect_to root_path
            end
        else
            redirect_to root_path
        end
    end

    def lessons_list

    end

    def user_task
        if session[:user_id]
            @current_task = Task.find(param_id)
        else
            redirect_to root_path
        end
    end

    private
    def param_id
        params[:id]
    end

end
