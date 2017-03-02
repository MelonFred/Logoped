class User < ApplicationRecord
  has_many :tasks
  validates :fio, 
            :presence => {:message => "Введите ФИО!!!" }
  validates :login, 
            :presence => {:message => "Введите Логин!!!" }
  validates :password, 
            :presence => {:message => "Введите Пароль!!!" }          
end