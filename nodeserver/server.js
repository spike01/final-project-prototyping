var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var Twit = require('twit')

server.set('views', __dirname + '/views');
server.set('view engine', 'ejs');

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response){
  response.render('index');
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});

var world = ['-180','-90','180','90']
var turkey = ['-74','40','74','41']
var san_fran = ['-122.75','36.8','-121.75','37.8']
var new_york = ['-74','40','-73','41']

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_OAUTH_TOKEN,
    access_token_secret: process.env.TWITTER_OAUTH_TOKEN_SECRET
})


io.on('connection', function (socket) { 
  var stream = T.stream('statuses/filter', { locations: new_york })
  stream.on('tweet', function(tweet){
    if(tweet.geo != null && tweet.place != null){
      socket.emit('tweet',  { tweet: {
                                text: tweet.text,
                                coords: tweet.geo.coordinates
                              }   
                            })
    }
  })

  socket.on('echo', function(data){
    console.log(data);
  })
  
  socket.on('disconnect', function(){
    stream.stop()
    console.log('Stream stopped')
  })
});

//&& tweet.place.country === "United Kingdom" <-- code for country limiting
