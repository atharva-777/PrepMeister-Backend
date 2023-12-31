import { time } from "console";
import { app } from "./app";
import http, { createServer } from "http";
// import { createServer } from "https";
import { dirname } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  pingInterval: 5000,
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    // credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});
const ioServer = io.listen(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

ioServer.on("connection", (socket) => {
  console.log("New client connected ", socket.id);
  const transport = socket.conn.transport.name;

  socket.on("setup",(user)=>{
    socket.join(user._id);
    socket.emit("connected");
  })

  socket.on("join chat",(room)=>{
    socket.join(room);
  })

  socket.on("typing",(room)=>{
    socket.in(room).emit("typing");
  })

  socket.on("stop typing",(room)=>{
    socket.in(room).emit("stop typing");
  })
  
  socket.on("message", (newMessage) => {
      let chat = newMessage.chat;
      if(!chat.users)return console.log("chat.users is not defined");
      chat.users.forEach((user:any)=>{
        if(user._id === newMessage.sender._id)return;
        socket.in(user._id).emit("message received",newMessage);
      })
  });

  socket.conn.on("upgrade", () => {
    const upgradedTransport = socket.conn.transport.name;
  });
  socket.on("create room", (data) => {

  });
  socket.on("join room", (data) => {
    const { username, roomId } = data;
    socket.join(roomId);
    let __createdTime__ = Date.now();
    socket.to(roomId).emit("message", {
      message: `${username} joined the chat room ${roomId}`,
      username: username,
      __createdTime__,
    });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 8080;
app.use((req, res, next) => {
  console.log("Auth middleware");
  next();
});

server.listen(port, () => {
  io.emit("connected", "arg1");
  console.log("Client url", process.env.CLIENT_URL);
  console.log(`http server is listening at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log("here")
//   console.log(`Listening on http://localhost:${port}`);
// });
