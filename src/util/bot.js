import { io } from "socket.io-client";

const socket = io("http://localhost:4000");
let count = 0;
socket.emit("startFishing");

socket.on("FishOnHook", () => {
    socket.emit("catchFish");
});

socket.on("QTE", () => {
    setTimeout(() => {
        socket.emit("qteComplete");
    }, 0);
});

socket.on("QTESuccess", () => {
    count++;
    console.log("Fish count:", count);
});
