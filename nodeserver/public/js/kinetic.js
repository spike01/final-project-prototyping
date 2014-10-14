$(document).ready(function() {

  var stage = new Kinetic.Stage({
    container: 'container',
    width: 14400,
    height: 7200
  });

  var layer = new Kinetic.Layer();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', './coords.txt', false);
  xhr.send(null);
  var data = xhr.responseText.split('\n');
  var dataArray = JSON.parse("[" + data + "]");

  dataArray.forEach(function(point){
    layer.add(
      new Kinetic.Rect({
        x: (point[1]+180)*40,
        y: (180-(point[0]+90))*40,
        width: 2,
        height: 2,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 1
      })
    )
  })

  function plot(point){
    layer.add(
      new Kinetic.Rect({
        x: (point[1]+180)*40
        y: (180-(point[0]+90))*40,
        width: 2,
      height: 2,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 1
      })
    )
  };

// rect.on('mouseover', function(){
//   this.stroke('orange');
//   layer.draw();
// })

// rect.on('mouseout', function(){
//   this.stroke('black');
//   layer.draw();
// })

// stage.getContainer().addEventListener('click', function(){
//   var hello = new Kinetic.Rect({
//       x: 209.555223,
//       y: 108.635942,
//       width: 10,
//       height: 10,
//       stroke: 'black',
//       strokeWidth: 1
//   })
//   layer.add(hello);
//   stage.add(layer);
// })

stage.add(layer);

});
