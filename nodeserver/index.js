// entry point for our node server is index.js which will handle requests for our Real time chat applicataion
// we initialised node server by using these commands
// cd nodeserver
// npm init
// npm i socket.io

// Technologies used -> HTML , CSS, JAVASCRIPT, NODEJS, SOCKET.IO

// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer()

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:8000",
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });


// io.listen(8000);

// httpServer.listen(3000);

import { Server } from "socket.io";

const io = new Server(8000, { 
  cors: {
    origin: "http://127.0.0.1:5500",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
 });

const users = {};

io.on("connection", (socket) => {
    
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send", (new_message) => {
    socket.broadcast.emit("receive", {
      message: new_message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (new_message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });


});
