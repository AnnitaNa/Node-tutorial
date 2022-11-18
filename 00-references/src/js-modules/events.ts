import events from "events";

const eventEmitter = new events.EventEmitter();

//handler
eventEmitter.on("newMessage", (msg) => {
    console.log(`Event emited: ${msg}`);
});

//emiting event
eventEmitter.emit("newMessage", "Events are kinda of boring");
