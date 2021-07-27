/*
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        // 1. TodoListの初期化
        this.todoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = element`<li>${item.title}</li>`;
                todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}
*/

/*
this.todoListModel.onChange(() => {
    const todoListElement = element`<ul />`;
    const todoItems = this.todoListModel.getTodoItems();
    todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckboxクラスをつける
        const todoItemElement = item.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
            : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
    });
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
});
 */

/*
this.todoListModel.onChange(() => {
    const todoListElement = element`<ul />`;
    const todoItems = this.todoListModel.getTodoItems();
    todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        const todoItemElement = item.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
            : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        // チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            // 指定したTodoアイテムの完了状態を反転させる
            this.todoListModel.updateTodo({
                id: item.id,
                completed: !item.completed
            });
        });
        todoListElement.appendChild(todoItemElement);
    });
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
});
*/


/*
this.todoListModel.onChange(() => {
    const todoListElement = element`<ul />`;
    const todoItems = this.todoListModel.getTodoItems();
    todoItems.forEach(item => {
        // 削除ボタン(x)をそれぞれ追加する
        const todoItemElement = item.completed
            ? element`<li><input type="checkbox" class="checkbox" checked>
                <s>${item.title}</s>
                -------->>>>>>><button class="delete">x</button>
            </li>`
            : element`<li><input type="checkbox" class="checkbox">
                ${item.title}
                -------->>>>>>><button class="delete">x</button>
            </li>`;
        // チェックボックスのトグル処理は変更なし
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            this.todoListModel.updateTodo({
                id: item.id,
                completed: !item.completed
            });
        });
        // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
        -------->>>>>>>const deleteButtonElement = todoItemElement.querySelector(".delete");
        -------->>>>>>>deleteButtonElement.addEventListener("click", () => {
            -------->>>>>>>this.todoListModel.deleteTodo({
                -------->>>>>>>id: item.id
            -------->>>>>>>});
        -------->>>>>>>});
        todoListElement.appendChild(todoItemElement);
    });
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
});
*/


/*
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
-------->>>>>>import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            -------->>>>>>const todoListView = new TodoListView();
            // todoItemsに対応するTodoListViewを作成する
            -------->>>>>>const todoListElement = todoListView.createElement(todoItems, {
                // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                -------->>>>>>onUpdateTodo: ({ id, completed }) => {
                    -------->>>>>>this.todoListModel.updateTodo({ id, completed });
                -------->>>>>>},
                -------->>>>>>// Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                -------->>>>>>onDeleteTodo: ({ id }) => {
                    -------->>>>>>this.todoListModel.deleteTodo({ id });
                -------->>>>>>}
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}
 */


/*
export class App {
    constructor() {
        -------->>>>>>this.todoListView = new TodoListView();
        this.todoListModel = new TodoListModel([]);
    }
-------->>>>>>handleAdd(title) {
    -------->>>>>>this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
-------->>>>>>-------->>>>>>}
handleUpdate({ id, completed }) {
    -------->>>>>>this.todoListModel.updateTodo({ id, completed });
-------->>>>>>}

-------->>>>>>handleDelete({ id }) {
    -------->>>>>>this.todoListModel.deleteTodo({ id });
-------->>>>>>}

mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    const containerElement = document.querySelector("#js-todo-list");
    this.todoListModel.onChange(() => {
        const todoItems = this.todoListModel.getTodoItems();
        const todoListElement = this.todoListView.createElement(todoItems, {
            // Appに定義したリスナー関数を呼び出す
            onUpdateTodo: ({ id, completed }) => {
                -------->>>>>>this.handleUpdate({ id, completed });
            },
            onDeleteTodo: ({ id }) => {
                -------->>>>>>this.handleDelete({ id });
            }
        });
        render(todoListElement, containerElement);
        todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        -------->>>>>>this.handleAdd(inputElement.value);
        inputElement.value = "";
    });
}
}
* /