enable :sessions
get "/" do


  erb :index
end

get "/auth" do
  client = LinkedIn::Client.new(settings.api, settings.secret)
  request_token = client.request_token(:oauth_callback => "http://#{request.host}:#{request.port}/auth/callback")
  session[:rtoken] = request_token.token
  session[:rsecret] = request_token.secret

  redirect client.request_token.authorize_url
end

get "/auth/logout" do
   session[:atoken] = nil
   Connection.delete_all
   Industry.delete_all 
   Location.delete_all
   redirect "/"
end

get "/auth/callback" do
  client = LinkedIn::Client.new(settings.api, settings.secret)
  if session[:atoken].nil?
    pin = params[:oauth_verifier]
    atoken, asecret = client.authorize_from_request(session[:rtoken], session[:rsecret], pin)
    session[:atoken] = atoken
    session[:asecret] = asecret

    seed_connections_from_user
  end
  redirect "/logged_in"
end

get "/logged_in" do 
  @industries = Industry.select('industry_name').group('industry_name').order("count(industry_name) desc").limit(5)
  @locations = Location.select('location_name').group('location_name').order("count(location_name) desc").limit(5)
  p @industries 
  p @locations 

  erb :index
end

post '/industries' do 
  industries = Industry.select('id').where("industry_name = '#{params.keys.first}'").to_a

  connections = []
  industries.each do |industry|
    connections << Connection.find_by(:industry_id => industry.id)
  end

  p connections 
  content_type :json 
  {connections: connections, industry: params.keys.first}.to_json
end

post '/locations' do 
  locations = Location.select('id').where("location_name = '#{params.keys.first}'").to_a

  connections = []
  locations.each do |location|
    connections << Connection.find_by(:location_id => location.id)
  end

  p locations 
  content_type :json 
  {connections: connections, location: params.keys.first}.to_json
end






