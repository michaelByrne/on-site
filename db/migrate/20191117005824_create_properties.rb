class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    change_table :properties do |p|
      p.float :lat
      p.float :long
      p.string :use
      p.string :org
    end  
  end
end
