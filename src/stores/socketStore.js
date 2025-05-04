import { io } from "socket.io-client";
import { readable } from "svelte/store";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
    console.log("connected!");
});

export const socketStore = readable(socket);
