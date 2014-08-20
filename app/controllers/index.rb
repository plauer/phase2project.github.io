require 'linkedin'

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
   redirect "/"
end

get "/auth/callback" do
  client = LinkedIn::Client.new(settings.api, settings.secret)
  if session[:atoken].nil?
    pin = params[:oauth_verifier]
    atoken, asecret = client.authorize_from_request(session[:rtoken], session[:rsecret], pin)
    session[:atoken] = atoken
    session[:asecret] = asecret

   connections.all.each do |c|
    p c
     User.create(:first_name => c.first_name.to_s, :last_name => c.last_name.to_s,
                :headline => c.headline.to_s, :industry => c.industry.to_s,
                :location => c.location.to_s, :picture_url => c.picture_url.to_s)
    # p User.last.valid?
  end

  end
  redirect "/"
end

get "/search" do 
  @industries = User.where(industry: "Financial Services")
  @locations = User.where(location: "San Francisco Bay Area")
 

  erb :search
end

# post '/results' do 
#   # @results = User.where("industry in (?) OR location in (?)", params[:industry], params[:location])



#   redirect '/results'
# end

get '/results' do 
   p '*' * 50
  p params

  @results = User.where("industry in (?)", ["Financial Services", "Internet"]).to_a
  @search_keys = ["Financial Services", "Internet"].join(' - ')

  erb :results
end





