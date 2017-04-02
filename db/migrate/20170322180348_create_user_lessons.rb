class CreateUserLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :user_lessons do |t|
      
      t.integer :user_id
      t.integer :lesson_id

      t.timestamps
    end
  end
end
