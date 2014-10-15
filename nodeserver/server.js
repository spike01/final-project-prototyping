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

server.get('/index2', function(request, response){
  response.render('index2');
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});

var world = ['-180','-90','180','90']
var istanbul = ['-74','40','74','41']
var san_fran = ['-122.75','36.8','-121.75','37.8']
var new_york = ['-74','40','-73','41']

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_OAUTH_TOKEN,
  access_token_secret: process.env.TWITTER_OAUTH_TOKEN_SECRET
})


io.on('connection', function (socket) { 
  var stream = T.stream('statuses/filter', { locations: world })
  
  stream.on('tweet', function(tweet){
    if(tweet.geo != null && tweet.place != null){
      socket.emit('tweet',  { tweet: {
                                text: tweet.text,
                                lang: tweet.user.lang,
                                coords: tweet.geo.coordinates,
                                sentiment: 0}   
                            })
    }
  });

  socket.on('echo', function(data){
    console.log(data);
  })
  
  socket.on('disconnect', function(){
    
    stream.stop()
    console.log('Stream stopped')
  })
  socket.on('stop', function() {
    console.log('Stream stopped');
    stream.stop(function() { 
      socket.emit('stop echo')});

  })
});

//&& tweet.place.country === "United Kingdom" <-- code for country limiting
