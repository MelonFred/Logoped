class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      
      t.string :title
      t.date :date
      t.text :text
      t.string :img
      t.integer :user_id

      t.timestamps
    end
  end
end