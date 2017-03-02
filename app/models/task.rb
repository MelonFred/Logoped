class Task < ApplicationRecord
    belongs_to :user
    validates :title, :text, :user_id => true
end
