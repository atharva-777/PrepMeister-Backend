import { app } from "./app";
import http, { createServer } from "http";
import { dirname } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const server = createServer(app);
const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

io.on("connection", (socket) => {
  console.log("a user connected");
});

const port = process.env.PORT || 8080;
app.use((req, res, next) => {
  console.log("Auth middleware");
  next();
});

server.listen(8000, () => {
  console.log(`http server is listening at http://localhost:8000`);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
