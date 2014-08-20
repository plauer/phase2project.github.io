class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name, :last_name, :headline, :industry, :company, :linkedin_id, :location, :picture_url  
      
      t.timestamps
    end
  end
end
