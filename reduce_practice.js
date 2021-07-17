 var array = [1,2,3,4];

/* 引数にコールバック関数がくる
そしてコールバック関数は配列の要素マイナス１回だけ呼ばれる
この場合は３回呼ばれる。*/
　var result = array.reduce(
    function(one, two) {
        console.log(one);
        console.log(two);
        return one + two;　//１回目:3, ２回目:6, 3回目:10
})

console.log(result);  

