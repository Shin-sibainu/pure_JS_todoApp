import {App} from "./App.js";

const app = new App();
window.addEventListener("load", () => {
    app.mount();
});

//ページが破棄されたときのイベント
window.addEventListener("unload", () => {
    app.unmount();
})