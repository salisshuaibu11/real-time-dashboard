const express = require("express"),
      app = express(),
      http = require("http"),
      socketIO = require("socket.io"),
      server, io;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on("connection", (socket) => {
  const controllers = ["comments", "posts"];
  for (var i = 0; i < controllers.length; i++) {
    require(`./controllers/${controllers[i].controller}`)(socket);
  }
});

io.on("connection", (socket) => {
  setInterval(() => {
    socket.emit("seconds.update", {
      time: new Date()
    });
  }, 1000);
});
