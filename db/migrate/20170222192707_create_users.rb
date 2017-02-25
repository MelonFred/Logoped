class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|

      t.string :permission
      t.string :login
      t.string :password
      t.string :fio
      t.string :tasks

      t.timestamps
    end
  end
end
