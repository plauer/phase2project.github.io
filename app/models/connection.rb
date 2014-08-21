class Connection < ActiveRecord::Base
  belongs_to :industry 
  belongs_to :location
end
