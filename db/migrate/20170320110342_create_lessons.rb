class CreateLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :lessons do |t|

      t.string :title
      t.integer :tasks_id, array: true, default: []

      t.timestamps
    end
  end
end