console.log("App.js: loaded");

/* JavaScriptモジュールを書く場所。index.jsで読み込ませる。 */

export class App {
  constructor() {
    console.log("App initialized")
  }
  mount(){
    // `id="js-form`の要素を取得
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    // form要素から発生したsubmitイベントを受け取る
    formElement.addEventListener("submit", (event) => {
      // イベントが発生したときに呼ばれるコールバック関数（イベントリスナー）
      // submitイベントの本来の動作を止める
      event.preventDefault();
      console.log(inputElement.value);
    });
  }
}