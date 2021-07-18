import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    /**
     * @param {TodoItemModel[]} [item] 初期アイテム一覧（デフォルトは空の配列）
     */
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
        this.emitChange();
    }
}
