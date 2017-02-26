# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
config = YAML::load(File.open(File.expand_path('seed.yml', File.dirname(__FILE__))))

config.each {|key, value| 
    value.each {|value| 
        task = Task.create(value["tasks"])
        User.create(permission: value["permission"], login: value["login"], password: value["password"], fio: value["fio"], tasks: task)
    }     
}