var set = new Set([1, 2, 3]);
set.add(4);

var map = new Map([["key1", set]]);
// console.log(map.get("key1"));

function addValue(key, value) {
        const valueSet = map.get(key); //valueSetにはMapで取得したキーに対する値が入ってる(配列で)
        //Setオブジェクトにリスナー関数を登録している
        valueSet.add(value);
        console.log(valueSet);
    }

addValue("key1", 5);




