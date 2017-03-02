class User < ApplicationRecord
  has_many :tasks
  validates :fio, :login, :password, :permission => true
end