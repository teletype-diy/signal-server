const { Server } = require("socket.io");

const io = new Server({ /* options */ });

const connected_rooms = []

io.on("connection", async (socket) => {

    console.log(socket.id);


    // ...
    // const userId = await computeUserIdFromHeaders(socket);
    const userId = "dummy"

    socket.join(userId);

    // and then later
    // io.to(userId).emit("peer_info", connected_rooms);

    socket.on("halo_subscribe", (roomName) => {
        console.log(`new halo_subscribe for ${roomName}`);
        if (!connected_rooms.includes(roomName)) {
            connected_rooms.push(roomName)
        }
        socket.join(roomName);
    });

    socket.on("halo", (roomName, eventName, data) => {
        console.log(`new msg for room: ${roomName}`);
        if (!connected_rooms.includes(roomName)) {
            console.log("is a new room...");
            connected_rooms.push(roomName);
            // socket.on(roomName, (arg, arg1) => {
            //     // do something clever
            // })
        }
        // TODO: this is almost certainly wrong. but it only works if it is here... what does that mean.
        // nvm still appears to work.. go to sleep----
        // socket.join(roomName);
        console.log(data);
        io.to(roomName).emit("peer_info", eventName, data);
        // connected_rooms.push(arg)
        // io.to(userId).emit("peer_info", connected_client_list);
    })


});

io.listen(3456);
