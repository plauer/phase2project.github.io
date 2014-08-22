helpers do
  def login?
    !session[:atoken].nil?
  end

  def profile
    puts '*' * 50
    puts linkedin_client.profile
    linkedin_client.profile unless session[:atoken].nil?
  end

  def connections
    # puts '*' * 50
    # puts linkedin_client.connections.all[9]
    linkedin_client.connections unless session[:atoken].nil?
  end

  def seed_connections_from_user
  #because not all users have locations ... will this break for users without other fields?
    # p connections.all.first.industry.to_s
    connections.all.each do |c|

      if c.site_standard_profile_request != nil
        profile_url = c.site_standard_profile_request[:url].to_s
      else
        prifle_url = nil
      end

      industry = Industry.create(:industry_name => String(c.industry))
      if c.location != nil
        location = Location.create(:location_name => c.location[:name].to_s)
        Connection.create(:first_name => c.first_name.to_s, :last_name => c.last_name.to_s,
                          :headline => c.headline.to_s, :picture_url => c.picture_url.to_s,
                          :location_id => location.id, :industry_id => industry.id,
                          :industry_name => industry.industry_name, :location_name => location.location_name,
                          :profile_url => profile_url)
      else 
        Connection.create(:first_name => c.first_name.to_s, :last_name => c.last_name.to_s,
                          :headline => c.headline.to_s, :picture_url => c.picture_url.to_s,
                          :industry_id => industry.id, :industry_name => industry.industry_name, 
                          :profile_url => profile_url)
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