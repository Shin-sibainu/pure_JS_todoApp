import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} [item] 初期アイテム一覧（デフォルトは空の配列）
     */
    //itemsは空の配列を最初に持っている
    constructor(items = []) {
        super(); // オブジェクトの親のコンストラクタを呼び出すために使用
        this.items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.items;
    }
    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する    
     * @param {Function} listener
     */
    onChange(listener) {
        // フォーム部品の状態が変更された時に発動される
        // ラジオボタンのチェックが付いた、外れたときに発火
        // 入力フォームのフォーカスを外したタイミング等
        this.addEventListener("change", listener);
    }
    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
     */ 
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.items.push(todoItem);//items配列にtodoItemを追加してる
        this.emitChange();//TodoListModelの変更が通知される
    }

    /**
     * 指定したidのTodoItemのcompletedを更新する
     * @param {{ id:number, completed: boolean }}
     */
    updateTodo({ id, completed }) {
        //items配列の中身のidを１つずつ✔。引数で指定したidと合致したらその要素（TodoItemModel）をtodoItemに返す
        const todoItem = this.items.find(todo => todo.id === id);
        if(!todoItem){
            return;
        }
        todoItem.completed = completed; //指定したidの状態を指定した引数で更新する
        this.emitChange();//TodoListModelの変更が通知される
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{ id:number, }}
     */
    deleteTodo({ id }){
        this.items = this.items.filter(todo => {
        //IDがあってなければtrueを返す=配列として残す。逆にIDがあっていれば（指定したIDであれば）filterしないから削除される
            return todo.id !== id
        });
        this.emitChange(); //TodoListModelの変更が通知される
    }
}
