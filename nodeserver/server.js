var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);

server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

server.get('/', function(request, response){
  response.render('index');
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});

var Twit = require('twit')

var T = new Twit({
  consumer_key       = process.env.TWITTER_CONSUMER_KEY,
  consumer_secret    = process.env.TWITTER_CONSUMER_SECRET,
  access_token        = process.env.TWITTER_OAUTH_TOKEN,
  access_token_secret = process.env.TWITTER_OAUTH_TOKEN_SECRET
})

var world = [ '-180', '-90', '180', '90' ]

var stream = T.stream('statuses/filter', { locations: world })

var twitStream = stream.on('tweet', function (tweet) {
if(tweet.geo != null && tweet.place != null && tweet.place.country === "United Kingdom") { tweet.geo.coordinates };
});

io.on('connection', function (socket) {
  socket.emit('coords', { twitStream });
  socket.on('coordEcho', function (data) {
    console.log(data);
  });
});
