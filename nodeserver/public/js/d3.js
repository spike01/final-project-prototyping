$(document).ready(function() {
  var socket = io.connect('http://localhost');
  var data = []

  var width = 3600,
height = 1800;

var x = d3.scale.linear()
  .domain([0, width])
  .range([0, width]);

var y = d3.scale.linear()
  .domain([0, height])
  .range([height, 0]);

var canvas = d3.select("#container").append("canvas")
  .attr("width", width)
  .attr("height", height)
  .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", zoom))
  .node().getContext("2d");

draw();

function stripPunctuation(sentence){
      return sentence.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  }

function zoom() {
  canvas.clearRect(0, 0, width, height);
  draw();
}

  function tweetColour(tweetObj) {
    if(tweetObj.sentiment > 0){
      return 'yellow'
    } else {
      if(tweetObj.sentiment < 0){
        return 'red'
      } else {
        return '#54A6E4'
      }
    }
  }

function draw() {
  var i = -1, n = data.length, d, cx, cy;
  canvas.beginPath();
  while (++i < n) {
    d = data[i];
    cx = x(d[0]);
    cy = y(d[1]);
    canvas.moveTo(cx, cy);
    canvas.arc(cx, cy, 2.5, 0, 2 * Math.PI);
    canvas.fillStyle =  'white'    //  d[2] sets the colour globally; not for each tweet
  }
  canvas.fill();
}

var counter = 0;

setInterval(draw, 30)

  function addData(tweet) {
    data[data.length] = [(tweet.coords[1]+180)*10, (tweet.coords[0]+180)*10, tweetColour(tweet)]
  };

socket.on('tweet', function(data){
  var tweetObj = data.tweet;
     stripPunctuation(tweetObj.text).split(' ').forEach(function(element){
     if(sentimentLookup[element]){
       tweetObj.sentiment += sentimentLookup[element];
     }
   })
  addData(tweetObj);
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
