class AdminPageController < ApplicationController
    
    def index
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def all_tasks
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @tasks = Task.where(subcategory: param_subcategory, category: param_category)
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def all_lessons
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @lessons = Lesson.all
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def user_list
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @users = User.all
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def user
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @current_user = User.find(param_id)
            @user_lesson = UserLesson.where(user_id: param_id)
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_user
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin") 
            @user = User.new(params_add_user)
            @user.permission = "client"
            if (@user.save)         
                redirect_to root_path, notice: "Пользователь успешно добавлен!"
            else
                redirect_to root_path, notice: "Что то пошло не так, попробуйте еще раз!"
            end
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_user_view
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @users = User.all
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def task_category
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @tasks = Task.all
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def task_subcategory
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @tasks = Task.where(category: param_category)
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def task
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @users = User.all
            @current_task = Task.find(param_id)
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_task
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @task = Task.new(params_add_task)
            if (@task.save)         
                redirect_to root_path, notice: "Упражнение успешно сохранено!"
            else
                redirect_to root_path, notice: "Что то пошло не так, попробуйте еще раз!"
            end
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_task_view
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def lesson
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @users = User.all
            @lesson_id = param_id
            @current_lesson = Lesson.find(param_id)
            @tasks = Task.find(@current_lesson.tasks_id)
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_lesson
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @lesson = Lesson.new(params_add_lesson)
            @lesson.tasks_id = param_tasks;
            if (@lesson.save)         
                redirect_to root_path, notice: "Занятие успешно сохранено!"
            else
                redirect_to root_path, notice: "Что то пошло не так, попробуйте еще раз!"
            end
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_lesson_view
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @tasks = Task.all
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    def add_lesson_for_user
        if (session[:user_id]) && (User.find(session[:user_id]).permission == "admin")
            @user_lesson = UserLesson.new(params_add_lesson_for_user)
            @user_lesson.lesson_id = param_id
            if (@user_lesson.save)         
                redirect_to root_path, notice: "Занятие назначено клиенту!"
            else
                redirect_to root_path, notice: "Что то пошло не так, попробуйте еще раз!"
            end
        else
            redirect_to root_path, notice: "Вам сюда низя!"
        end
    end

    private
    def params_add_user
        params.require(:user).permit(:fio, :login, :password)
    end

    def params_add_task
        params.require(:task).permit(:title, :text, :category, :subcategory)
    end

    def params_add_lesson
        params.require(:lesson).permit(:title)
    end

    def param_tasks
        params[:tasks_id]
    end

    def param_id
        params[:id]
    end

    def param_category
        params[:category]
    end

    def param_subcategory
        params[:subcategory]
    end

    def params_add_lesson_for_user
        params.require(:user_lesson).permit(:user_id)
    end
end
