import {EventEmitter} from "./src/EventEmitter.js"

const event = new EventEmitter();
event.addEventListener("test-event", () => console.log('aaa')); 
event.addEventListener("test-event", () => console.log('aaa'));

event.emit("test-event");

