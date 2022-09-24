import WebSocket from "ws"
import { config } from "../.."
import PlaylistGen from "../resources/playlistGen"
config

export default class Connection {

    public socket?: WebSocket 

    constructor() {
      
    }

    connect() {
        this.socket = new WebSocket(`ws://127.0.0.1:${config.frontend.server_websocket_port}`)

        this.socket.on("open", () => {
            console.log("Connected to server")
        })
        this.socket.on("message", (data) => {
            console.log(data)
        })        
    }

     sendData(type: "request_instruction" | "upload_instruction", token: string, data: PlaylistGen) {
        if (!this.socket) throw new Error("Not connected to server")
        this.socket.send(JSON.stringify({
            type: type,
            user_token: token,
            data
        }))
    }

}