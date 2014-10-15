require 'tweetstream'

client = Twitter::Streaming::Client.new do |config|
  config.consumer_key       = ENV['TWITTER_CONSUMER_KEY']
  config.consumer_secret    = ENV['TWITTER_CONSUMER_SECRET']
  config.oauth_token        = ENV['TWITTER_OAUTH_TOKEN']
  config.oauth_token_secret = ENV['TWITTER_OAUTH_TOKEN_SECRET']
end



# client.location(-180,-90,180,90) do |object|
#  	puts object
# end


location = [-180,-90,180,90]
client.filter(:locations => location.join(",")) do |object|
  puts object.geo.coordinates if object.is_a?(Twitter::Tweet)
end
