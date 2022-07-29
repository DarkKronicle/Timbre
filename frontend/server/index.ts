import express from "express";
import path from "path";
import toml from "toml";
import fs from "fs";
import IPC from "../modules/connection/ipc";
import type Backend from "../types/globalTypes"
export class Globals {
  public config = toml.parse(
    fs.readFileSync(path.resolve("../config.toml")).toString()
  ) as Backend.Config;
  public app = express();
  public ipc = new IPC();

  constructor() {
    this.app.use(express.json());
    this.app.use("/", express.static(path.resolve("./public")));

    //index route
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve("public/index.html"));
    });

    //start server
    this.app.listen(this.config.frontend.http_port, () => {
      console.log(`Server listening on port ${this.config.frontend.http_port}`);
    })
  }
}

const _ = new Globals()
export default _
