class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.string :first_name, :last_name, :headline, :picture_url
      t.belongs_to :industry
      t.belongs_to :location
    end
  end
end
