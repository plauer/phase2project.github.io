helpers do
  def login?
    !session[:atoken].nil?
  end

  def profile
    # puts '*' * 50
    # puts linkedin_client.profile 
    linkedin_client.profile unless session[:atoken].nil?
  end

  def connections
    # puts '*' * 50
    # puts linkedin_client.connections.all[9].location[:name]
    linkedin_client.connections unless session[:atoken].nil?
  end

  def seed_connections_from_user
  #because not all users have locations ... will this break for users without other fields?
    connections.all.each do |c|

      industry = Industry.create(:industry_name => c.industry.to_s)
      if c.location != nil
        location = Location.create(:location_name => c.location[:name].to_s)
        Connection.create(:first_name => c.first_name.to_s, :last_name => c.last_name.to_s,
                          :headline => c.headline.to_s, :picture_url => c.picture_url.to_s,
                          :location_id => location.id, :industry_id => industry.id)
      else 
        Connection.create(:first_name => c.first_name.to_s, :last_name => c.last_name.to_s,
                          :headline => c.headline.to_s, :picture_url => c.picture_url.to_s,
                          :industry_id => industry.id)
      end
    end
  end

  private
  def linkedin_client
    client = LinkedIn::Client.new(settings.api, settings.secret)
    client.authorize_from_access(session[:atoken], session[:asecret])
    client
  end

end