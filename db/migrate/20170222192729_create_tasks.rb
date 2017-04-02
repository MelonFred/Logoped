class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      
      t.string :title
      t.string :category
      t.string :subcategory
      t.string :subcategory2
      t.text :text

      t.timestamps
    end
  end
end
