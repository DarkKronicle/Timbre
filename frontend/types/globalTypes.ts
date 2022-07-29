export default Backend;
export declare namespace Backend {
  /*
    
    TYPINGS
    
    This file will detail a basic layout to communicate with the backend.
    this also will be used in my code to enforce typing rules
    
    */

  //IPC, or Inter Process Communication
  namespace IPC {
    //Messages sent to the backend
    type SendMessages = IPCConnection;

    //Messages received from the backend
    type ReceiveMessages = IPCConnection;

    interface IPCConnection {
      type: "connect";
      data: IPCConnectionData;
    }

    interface IPCConnectionData {
      timestamp: number;
    }

    interface IPCRequestInstruction {
      type: "request_instruction";
      user_token: string;
      data: IPCRequestInstructionData;
    }

    //https://discord.com/channels/753693459369427044/1000617224953921688/1000973676763689020
    interface IPCRequestInstructionData {}

    interface IPCUploadInstruction {
      type: "upload_instruction";
      user_token: string;
      data: IPCUploadInstructionData;
    }

    //https://discord.com/channels/753693459369427044/1000617224953921688/1000973720040517653
    interface IPCUploadInstructionData {}
  }

  //Config, should match the config.toml file

  interface Config {
    frontend: {
      http_port: number;
      https_port: number;
      websocket_port: number;
    };
  }
}
