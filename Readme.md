
# signaling server for teletype-diy for pulsar editor

## Run it

```
node index.js
```

## Run it with docker-compose/podman-compose

You can use the `docker-compose.yml` file to run the signal-server.
Just start it like this:

```
docker-compose up
```

or with podman compose

```
podman-compose up
```

The default compose config comes with a coturn ICE-Server. This enables teletype to connect even if participants are behind NAT.
