const { Server } = require("socket.io");

const io = new Server({ /* options */ });

// conditonal import of postgres
// npm install @socket.io/postgres-adapter pg
try {
    const { createAdapter } = require("@socket.io/postgres-adapter");
    const { Pool } = require("pg");

    const pool = new Pool({
      user: process.env.POSTGRES_USER || "postgres",
      host: process.env.DBHOST || "postgres",
      database: process.env.POSTGRES_DB || "postgres",
      password: process.env.POSTGRES_PASSWORD || "secret",
      port: 5432,
    });

    pool.query(`
      CREATE TABLE IF NOT EXISTS socket_io_attachments (
          id          bigserial UNIQUE,
          created_at  timestamptz DEFAULT NOW(),
          payload     bytea
      );
    `);

    io.adapter(createAdapter(pool));
    console.log("Using postgres adapter");
} catch (e) {
    console.log("Not using postgres adapter");
    console.log(e);
}
// conditonal import of postgres - end


io.on("connection", async (socket) => {
    // console.log(socket.id);

    socket.on("protocol_version", (callback) => {
        // socket.emit("protocol_version", 9);
        console.log("someone asked for version");
        callback({ok: true, body: {version: 9}});
    })

    // connect peers into their channels
    socket.on("halo_subscribe", (roomName) => {
        console.log(`new halo_subscribe for ${roomName}`);
        socket.join(roomName);
    });

    // send a new msg to a channel
    socket.on("halo", (roomName, eventName, data) => {
        console.log(`new msg for room: ${roomName}`);
        // console.log(data);
        io.to(roomName).emit("peer_info", eventName, data);
        // connected_rooms.push(arg)
        // io.to(userId).emit("peer_info", connected_client_list);
    })


});

io.listen(3456);
