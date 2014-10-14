$(document).ready(function() {

  var stage = new Kinetic.Stage({
    container: 'container',
    width: 1800,
    height: 900
  });
  var layer = new Kinetic.Layer();
  var socket = io.connect('http://localhost');
  var sentimentLookup = {
                          happy: 1,
                          sad: -1
                        };

  function stripPunctuation(sentence){
      return sentence.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  }
  
  function drawDot(tweetObj){
    var tweetColour = tweetObj.sentiment !== 0 ? 'red' : 'black'
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

  socket.on('tweet', function(data){
    var tweetObj = data.tweet;
    stripPunctuation(tweetObj.text).split(' ').forEach(function(element){
      if(sentimentLookup[element]){
        tweetObj.sentiment += sentimentLookup[element];
      }
    })
    drawDot(tweetObj);
    socket.emit('echo', data);
  })

});
