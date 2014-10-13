require 'tweetstream'

#file = "uk_tweets.txt"
#tweets = File.open(file, "w")

TweetStream.configure do |config|
  config.consumer_key       = ENV['TWITTER_CONSUMER_KEY']
  config.consumer_secret    = ENV['TWITTER_CONSUMER_SECRET']
  config.oauth_token        = ENV['TWITTER_OAUTH_TOKEN']
  config.oauth_token_secret = ENV['TWITTER_OAUTH_TOKEN_SECRET']
  config.auth_method        = :oauth
end

# This will pull a sample of all tweets based on
# your Twitter account's Streaming API role.
@world_coord = "-180, -90, 180, 90"
@ny_coord = "-74,40,-73,41"

def isUk?(country)
  country == "United Kingdom" 
end

TweetStream::Client.new.locations(@world_coord) do |status|
  #puts "#{status.text}" if isUK?(status.place.country)
  puts "#{status.geo.coordinates}" if isUk?(status.place.country)
end

#tweets.close


