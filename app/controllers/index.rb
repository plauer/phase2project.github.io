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
  {connections: connections}.to_json
end

# select * from locations group by count(:location_name) desc 



# get "/search" do 
#   @industry_results = User.select("industry").group("industry").to_a
#   @location_results = User.select("location").group("location").to_a



 

#   erb :search
# end


# get '/results' do 
#   join_type = params[:join_type]
#   p join_type
#   params.delete("join_type")
#   @search_parameters = params



#   # if params[:industry]

#   # if join_type == 'or'
#   #   @results = User.where("industry in (?) OR location in (?)", params[:industry], params[:location]).to_a
#   # elsif join_type == 'and'
#   #   @results = User.where("industry in (?) AND location in (?)", params[:industry], params[:location]).to_a
#   # end

#   # @results.uniq!
#   @results = User.where("industry in (?) OR location in (?)", params[:industry], params[:location]).to_a

#   erb :results
# end


# post '/results' do 


# end





