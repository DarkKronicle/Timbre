import Express, { Application } from "express";
import router from "./router";

export default class Webserver {

    private app: Application
    private port: number;

    constructor(port: number) {
        this.app = Express();
        this.port = port;
        this.app.use("/", router)
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

}