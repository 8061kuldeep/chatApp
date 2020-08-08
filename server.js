var express = require("express");
var app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public/"));
http.listen(port, () => {
  console.log("server running on port" + port);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket.io"
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
