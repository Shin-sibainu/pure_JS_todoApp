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
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        // イベントに対してリスナー関数がセットされていなければ
        if (!this._listeners.has(type)) {
            // イベントに対して空のSetコンストラクタをセットする
            this._listeners.set(type, new Set());　
        }
        const listenerSet = this._listeners.get(type);
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        // listenerSetにはSetオブジェクトが格納されている
        // その中のlistener関数を１つずつ取り出してcall（呼び出し）ている
        listenerSet.forEach(listener => {
            console.log(listener);
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