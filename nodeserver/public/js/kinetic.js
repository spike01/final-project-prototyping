var layer;

$(document).ready(function() {

  var stage = new Kinetic.Stage({
    container: 'container',
    width: 1800,
    height: 900
  });


  layer = new Kinetic.Layer();
  var socket = io.connect('http://localhost');

  function stripPunctuation(sentence){
      return sentence.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  }
  
  function drawDot(tweetObj){
    if(tweetObj.sentiment > 0){
      var tweetColour = 'yellow'
    } else {
      if(tweetObj.sentiment < 0){
        var tweetColour = 'red'
      } else {
        var tweetColour = '#54A6E4'
      }
    }
    
    layer.add(
      new Kinetic.Circle({
        x: (tweetObj.coords[1]+180)*5,
        y: (180-(tweetObj.coords[0]+90))*5,
        width: 2,
        height: 2,
        fill: tweetColour,
        stroke: tweetColour,
        strokeWidth: 1
      })
    )
  }

  function drawLayer(){
    stage.add(layer)
  }

  setInterval(drawLayer, 30)

  var counter = 0;

  socket.on('tweet', function(data){
    var tweetObj = data.tweet;
    var lang = data.tweet.lang;
    stripPunctuation(tweetObj.text).split(' ').forEach(function(element){
      if(sentimentLookup[lang][element]){
        tweetObj.sentiment += sentimentLookup[lang][element];
      }
    })
    drawDot(tweetObj);
    counter += 1;
    $('#tweetCount').text(counter);
    socket.emit('echo', data);
  })

   $('.stop-connection').on('click', function() {
  socket.emit('stop');
 });
   socket.on('stop echo', function() {
    console.log('Stream stopped.');
   });


});
