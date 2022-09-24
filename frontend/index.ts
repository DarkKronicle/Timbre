import { PrismaClient } from "@prisma/client";
import Webserver from "./modules/server/server";
import SpotifyWebApi from "spotify-web-api-node";
import toml from "toml";
import fs from "fs";
import path from "path";
import ws from "ws";
import PlaylistGen from "./modules/resources/playlistGen";
import Connection from "./modules/connection/connection";

export const config = toml.parse(fs.readFileSync(path.resolve("../config.toml"), "utf-8"));
export const db = new PrismaClient();
export const server = new Webserver({
  httpPort: config.frontend.http_port,
  httpsPort: config.frontend.https_port,
});
export const socketServer = new ws.Server({ port: config.frontend.client_websocket_port }).once(
  "listening",
  () => {
    console.log(`Client Websocket Server listening on port ${config.frontend.client_websocket_port}`);
  }
);
export const spotify = new SpotifyWebApi({
  clientId: config.backend.client_id,
  clientSecret: config.backend.client_secret,
  redirectUri: config.backend.redirect_uri,
});
export const connection = new Connection()

server.start();



setTimeout(() => {
    
    connection.connect()

}, 1000)