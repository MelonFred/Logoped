class UserLesson < ApplicationRecord
    validates :user_id, 
              :presence => {:message => "Выберите клиента!!!" }
    validates :lesson_id, 
              :presence => {:message => "Ой-ой, вы что то начудили..." }     
end
