class CreateIndustries < ActiveRecord::Migration
  def change
    create_table :industries do |t|
      t.string :industry_name
    end
  end
end
