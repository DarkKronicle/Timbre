import _ from "../../server";
import { WebSocket } from "ws" 
import type Backend from "../../types/globalTypes";
export default class IPC {
    
    public ws = new WebSocket(`ws://localhost:${_.config.frontend.websocket_port}`);
    public handlers = new Map<string, (data: any) => Promise<void> | void>();

    constructor() {

        this.ws.addEventListener("open", () => {
            this.sendMessage("connnection", {
                timestamp: Date.now()
            })
        })

        this.ws.addEventListener("message", (event) => {
            let data = JSON.parse(event.data.toString())
            let handler = this.handlers.get(data.type)
            if (handler) {
                handler(data.data)
            }
        })
    }

    /**
     * Send a message to the backend
     * @param type The type of message
     * @param data Data to send
     * @param user_token The user token to send with the message (Needed for some messages)
     */
    public sendMessage(type: "connnection", data: Backend.IPC.IPCConnectionData): void;
    public sendMessage(type: "request_instruction", data: Backend.IPC.IPCRequestInstructionData, user_token: string): void;
    public sendMessage(type: "upload_instruction", data: Backend.IPC.IPCUploadInstructionData, user_token: string): void;
    public sendMessage(type: string, data: any, user_token?: string): void {
        this.ws.send(JSON.stringify({
            type,
            data,
            user_token
        }))

    }

    public addMessageHandler(type: "connnection", handler: (data: Backend.IPC.IPCConnection) => void): void;
    public addMessageHandler(type: string, handler: (data: any) => Promise<void> | void): void {
        this.handlers.set(type, handler)
    }
}