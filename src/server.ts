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
  socket.on("message", (message) => {
    console.log("message event at backend");
    console.log(`Received message from client: ${message}`);
    // ioServer.emit("message", message);
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
