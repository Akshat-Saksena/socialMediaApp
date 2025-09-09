import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { dataBase } from "./dataBase.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

await dataBase();

io.on("connection", (socket) => {
  console.log("User Connected: Socket ID: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected: Socket ID: " + socket.id);
  });
});

app.set("io", io);

server.listen(8800, () => {
  console.log("Server started on port 8800");
});
