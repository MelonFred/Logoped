class Task < ApplicationRecord

    validates :title, 
              :presence => {:message => "Введите Название!!!" }
    validates :text, 
              :presence => {:message => "Пустое Задание!!!" }          
    validates :category, 
              :presence => {:message => "Выберите категорию!!!" }
    validates :subcategory, 
              :presence => {:message => "Выберите подкатегорию!!!" }
end
