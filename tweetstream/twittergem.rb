require 'tweetstream'

client = Twitter::Streaming::Client.new do |config|
  config.consumer_key       = ENV['TWITTER_CONSUMER_KEY']
  config.consumer_secret    = ENV['TWITTER_CONSUMER_SECRET']
  config.access_token        = ENV['TWITTER_OAUTH_TOKEN']
  config.access_token_secret = ENV['TWITTER_OAUTH_TOKEN_SECRET']
end


# client.location(-180,-90,180,90) do |object|
#  puts object
# end


location = [-180,-90,180,90]
uk_location = [49.162090, -13.413930, 60.854691, 1.768960]
languages = ["en", "fr", "sp", "zh"]
words = ["shark"]
#client.filter(:track => topics.join(",")) do |object|
    #puts object.text if object.is_a?(Twitter::Tweet)
#end
client.filter(:locations => location.join(",")) do |object|
  puts object.text
  puts object.geo.coordinates if object.is_a?(Twitter::Tweet)
end
