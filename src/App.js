console.log("App.js: loaded");
import {element} from "./view/html-util.js"

/* JavaScriptモジュールを書く場所。index.jsで読み込ませる。 */
export class App {
  constructor() {
    console.log("App initialized")
  }
  mount(){
    // `id="js-form`の要素を取得
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    let todoItemCount = 0;
    // form要素から発生したsubmitイベントを受け取る
    formElement.addEventListener("submit", (event) => {
      // イベントが発生したときに呼ばれるコールバック関数（イベントリスナー）
      // submitイベントの本来の動作を止める
      event.preventDefault();
      console.log(inputElement.value);
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      containerElement.appendChild(todoItemElement);

      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      inputElement.value = "";
    });
  }
}