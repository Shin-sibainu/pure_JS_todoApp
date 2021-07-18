export class EventEmitter {
    constructor() {
        // 登録する [イベント名, Set(リスナー関数)] を管理するMap
        this._listeners = new Map();
        // this._listeners.get(イベント名)でリスナー関数を取得できる
        // this._listeners.add(イベント名)でリスナー関数を追加できる
        // this._listeners.delete(イベント名)でリスナー関数を削除できる
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * 登録するだけ、呼び出すのはemit()関数
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        // イベントに対してリスナー関数がセットされていなければ
        if (!this._listeners.has(type)) {
            // イベントに対して空のSetオブジェクトをセットする
            this._listeners.set(type, new Set());　
        }
        const listenerSet = this._listeners.get(type);
        //Setオブジェクトにリスナー関数を登録している（配列として持っている）
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * 登録したイベント名を引数に指定することで、そのイベントに対して登録してある
     * イベントリスナーを発火させる
     * @param {string} type イベント名
     */
    emit(type) {
        // 引数にとったtype(イベント名)を指定し、それをlistenerSetに格納
        // 型はSetオブジェクトでキーと値を持っている
        const listenerSet = this._listeners.get(type); //"change"というイベント名に格納されてるSetオブジェクトを取得 
        if (!listenerSet) {
            return;
        }
        // listenerSetにはSetオブジェクトが格納されている
        // その中のリスナー関数を１つずつ取り出してcall（呼び出し）ている
        console.log(listenerSet); //型はオブジェクト(Set)
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    removeEventListener(type, listener) {
        // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        });
    }
}