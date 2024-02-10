const { io } = require("socket.io-client");

const socket = io("http://127.0.0.1:3456/");

socket.on("connect", () => {
  console.log(socket.id);
});

socket.emit('halo', "mike");

socket.on("peer_info", (msg) => {
    console.log("peer_info:");
    console.log(msg);
})
