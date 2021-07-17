import { TodoItemModel } from "./src/model/todoItemModel.js";

const item = new TodoItemModel({
    title: "未完了のタスク",
    completed: false
    });


const compleated_item = new TodoItemModel({
    title: "完了済のタスク",
    completed: true
});

console.log(item.id !== compleated_item.id);// trueだからインスタンス化したアイテム毎にIDが異なることがわかる