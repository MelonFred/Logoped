class User < ApplicationRecord
  validates :fio, 
            :presence => {:message => "Введите ФИО!!!" }
  validates :login, 
            :presence => {:message => "Введите Логин!!!" }
  validates :password, 
            :presence => {:message => "Введите Пароль!!!" }          
end