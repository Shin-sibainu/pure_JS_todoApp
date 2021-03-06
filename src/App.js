//HTML要素とModel間で発生するイベントを中継する役割を持つ
console.log("App.js: loaded");
import {TodoListModel} from "./model/todoListModel.js";
import {TodoItemModel} from "./model/todoItemModel.js";
import {TodoListView} from "../src/view/TodoListView.js";
import {TodoItemView} from "../src/view/TodoItemView.js";
import {render} from "./view/html-util.js"
//import {element, render} from "./view/html-util.js"

/* JavaScriptモジュールを書く場所。index.jsで読み込ませる。 */
export class App {
  constructor() {
    console.log("App initialized");
    // 1.TodoListの初期化
    //this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
    //console.log(this.todoListModel.getTotalCount()); //0
  }

  handleAdd(title){
    if(title === ""){
      return;
    }
    this.todoListModel.addTodo(new TodoItemModel({title, completed: false}));
  }

  handleUpdate({id, completed}) {
    //console.log("handleUpdate is called");
    this.todoListModel.updateTodo({id, completed});
  }

  handleDelete({id}) {
    this.todoListModel.deleteTodo({ id });
  }

  mount(){
    // `id="js-form`の要素を取得
    console.log("mount is called")
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    //let todoItemCount = 0;
    // 2.TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      //console.log("onchange is called");
      //それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
      /*onUpdateTodo: ({id, completed}) => {
        this.todoListModel.updateTodo({id, completed});
        }, */
        onUpdateTodo: ({id, completed}) => {
          //console.log("onUpdateTodo");//✔ボタンクリックしたときに発動
          this.handleUpdate({id, completed});
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        } 
      });
      /* //TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      todoItems.forEach(item => {
        //const todoItemElement = element`<li>${item.title}</li>`;
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckedboxクラスをつける
        const todoItemElement = item.completed //条件式
        ? element`<li><input type="checkbox" class="checkbox" checked>
            <s>${item.title}</s>
            <button class="delete">x</button>
          </li>` //falseなら完了済
        : element`<li><input type="checkbox" class="checkbox">
            ${item.title}
            <button class="delete">x</button>
          </li>` //trueなら未完了
        //チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        //ラジオボタンが押されるかどうかを常にリッスンしておく
        inputCheckboxElement.addEventListener("change", () => {
          //指定したアイテムの完了状態を反転させる
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        //削除ボタン（x）がクリックされたときにTodoListModelからアイテムを削除
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          //TodoItemを削除する
          this.todoListModel.deleteTodo({
            id: item.id
          });
        });
        todoListElement.appendChild(todoItemElement);
      }); */


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
   /*    this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false //最初は未完了状態
      })); */
      this.handleAdd(inputElement.value);
      //console.log(inputElement.value);
      //const todoItemElement = element`<li>${inputElement.value}</li>`;
      //containerElement.appendChild(todoItemElement);

      //todoItemCount += 1;
      //todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      inputElement.value = "";
    });

    //ここからはYotube用
    /* 
    const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // Todoアイテム数
        let todoItemCount = 0;
        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            // 追加するTodoアイテムの要素(li要素)を作成する
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            // Todoアイテムをcontainerに追加する
            containerElement.appendChild(todoItemElement);
            // Todoアイテム数を+1し、表示されてるテキストを更新する
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            // 入力欄を空文字列にしてリセットする
            inputElement.value = "";
        });
    }
    */
  }

  //ページが読み込み破棄されたときにイベントリスナーを解除する
/*   unmount() {
    console.log("unmount is called");
    const formElement = document.querySelector("#js-form");
    //target.removeEventListener(type, listener[, options]);
    //フォームのイベントリスナーの削除
    formElement.removeEventListener("submit", () => {
    });
  } */
}