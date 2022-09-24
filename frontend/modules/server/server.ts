import Express, { Application } from "express";
import router from "./router";
import http from "http";
import https from "https";
import fs from "fs";

export default class Webserver {

    private app: Application
    private httpServer: http.Server;

    constructor(public opt: {
        httpPort: number,
        httpsPort: number,
    }) {
        this.app = Express();
        this.app.use("/", router)

        this.httpServer = http.createServer(this.app);
    }

    public start() {
        this.httpServer.listen(this.opt.httpPort, () => {
            console.log(`HTTP Server listening on port ${this.opt.httpPort}`);
        });

        // this.httpsServer.listen(this.opt.httpsPort, () => {
        //     console.log(`HTTPS Server listening on port ${this.opt.httpsPort}`);
        // });
    }

}