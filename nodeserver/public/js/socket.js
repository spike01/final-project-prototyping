var socket = io.connect('http://localhost');
socket.on('tweet', function (data) {
  plot(data.coords);
  console.log(data);
  socket.emit('echo', data );
});
