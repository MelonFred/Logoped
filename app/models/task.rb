class Task < ApplicationRecord
    belongs_to :user
    validates :user_id, :presence => true
    validates :title, 
              :presence => {:message => "Введите Название!!!" }
    validates :text, 
              :presence => {:message => "Пустое Задание!!!" }          
end
