/*

TYPINGS

This file will detail a basic layout to communicate with the backend.
this also will be used in my code to enforce typing rules

*/

interface IPCConnection {
    type: "connect", 
    data: IPCConnectionData
}

interface IPCConnectionData {
    timestamp: number
} 
