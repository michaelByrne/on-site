class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |p|
      p.string :name
      p.float :lat
      p.float :long
      p.string :use
      p.string :org
    end  
  end
end
