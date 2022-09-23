import { PrismaClient } from "@prisma/client";
import Webserver from "./modules/server/server";
import SpotifyWebApi from "spotify-web-api-node"
import toml from "toml";
import fs from "fs";
import path from "path";

export const config = toml.parse(fs.readFileSync(path.resolve("../config.toml"), "utf-8"));
export const db = new PrismaClient();
export const server = new Webserver(3000);
export const spotify = new SpotifyWebApi({
    clientId: config.backend.client_id,
    clientSecret: config.backend.client_secret,
    redirectUri: config.backend.redirect_uri
});

server.start()