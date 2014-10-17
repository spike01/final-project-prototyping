// var Twit = require('twit')

// var T = new Twit({
  //consumer_key       = process.env.TWITTER_CONSUMER_KEY,
  //consumer_secret    = process.env.TWITTER_CONSUMER_SECRET,
  //access_token        = process.env.TWITTER_OAUTH_TOKEN,
  //access_token_secret = process.env.TWITTER_OAUTH_TOKEN_SECRET
// })

// var world = [ '-180', '-90', '180', '90' ]

// var stream = T.stream('statuses/filter', { locations: world })

// var twitStream = stream.on('tweet', function (tweet) {
// 	if(tweet.geo != null && tweet.place != null && tweet.place.country === "United Kingdom") { console.log(tweet.geo.coordinates) 
// 	};
// });

var Twit = require('twit')

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_OAUTH_TOKEN,
  access_token_secret: process.env.TWITTER_OAUTH_TOKEN_SECRET
})

var world = [ '-180', '-90', '180', '90' ]

var stream = T.stream('statuses/sample' )

var twitStream = stream.on('tweet', function (tweet) {
 { console.log(tweet.text)
	};
});


