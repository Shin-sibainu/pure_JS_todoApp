console.log("App.js: loaded");
import {TodoListModel} from "./model/todoListModel.js";
import {TodoItemModel} from "./model/todoItemModel.js";
import {element, render} from "./view/html-util.js"

/* JavaScriptモジュールを書く場所。index.jsで読み込ませる。 */
export class App {
  constructor() {
    console.log("App initialized");
    // 1.TodoListの初期化
    this.todoListModel = new TodoListModel();
    console.log(this.todoListModel.getTotalCount()); //0
  }
  mount(){
    // `id="js-form`の要素を取得
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    //let todoItemCount = 0;
    // 2.TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      //TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      //それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        //const todoItemElement = element`<li>${item.title}</li>`;
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckedboxクラスをつける
        const todoItemElement = item.completed //条件式
        ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>` //falseなら完了済
        : element`<li><input type="checkbox" class="checkbox">${item.title}</li>` //trueなら未完了
        todoListElement.appendChild(todoItemElement);
      });
      //containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      //アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    // form要素から発生したsubmitイベントを受け取る
    // submitすることは状態が更新されるのと同義
    formElement.addEventListener("submit", (event) => {
      // イベントが発生したときに呼ばれるコールバック関数（イベントリスナー）
      // submitイベントの本来の動作を止める
      event.preventDefault();
      //新しいTodoItemをTodoListへ追加する
      //アイテムを追加しただけでonChangeが呼ばれ、表示も更新される
      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      //console.log(inputElement.value);
      //const todoItemElement = element`<li>${inputElement.value}</li>`;
      //containerElement.appendChild(todoItemElement);

      //todoItemCount += 1;
      //todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      inputElement.value = "";
    });
  }
}