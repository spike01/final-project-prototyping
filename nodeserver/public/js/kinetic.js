$(document).ready(function() {

  var stage = new Kinetic.Stage({
    container: 'container',
    width: 1800,
    height: 900
  });

  var layer = new Kinetic.Layer();

  var socket = io.connect('http://localhost');
  
  socket.on('tweet', function(data) {
    layer.add(
      new Kinetic.Rect({
        x: (data.tweet.coords[1]+180)*5,
        y: (180-(data.tweet.coords[0]+90))*5,
        width: 2,
        height: 2,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 1
      })
    )
    stage.add(layer);
    console.log(data);
    socket.emit('echo', data);
  });

});
