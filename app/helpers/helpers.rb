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
    # puts linkedin_client.connections.all.first
    linkedin_client.connections unless session[:atoken].nil?
  end

  private
  def linkedin_client
    client = LinkedIn::Client.new(settings.api, settings.secret)
    client.authorize_from_access(session[:atoken], session[:asecret])
    client
  end

end