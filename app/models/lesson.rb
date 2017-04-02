class Lesson < ApplicationRecord
    validates :title, 
              :presence => {:message => "Введите Название!!!" }
    validates :tasks_id, 
              :presence => {:message => "Пустое Занятие!!!" }          
end
