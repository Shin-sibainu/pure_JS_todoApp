export function escapeSpecialChars(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039");
}


/**
 * ただのHTML文字列からHTML要素を作成して返す
 *  @param {string} html
 */
export function htmlToElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  /* template内容の最初の子HTML要素を取得する */
/*   console.log(template);
  console.log(template.content);
  console.log(template.content.firstChild); */
  return template.content.firstElementChild;
}

/**
* HTML文字列からDOM Nodeを作成して返すタグ関数
* @return {Element}
*/
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1]; //appと入力すると['app']が入る。その０番目を取得。
    /* console.log(value); //app
    console.log(result); //<li>
    console.log(str); //</li>
    console.log(i); //1 */
    /* 入力された内容が文字であれば */
    if(typeof value === "string") {
      /* エスケープ文字を変換して返す */
      /* resultには１つ前に呼んだコールバック関数の文字列の合計が１つにまとめて入っている */
      return result + escapeSpecialChars(value) + str; //<li>app</li>文字列がhtmlStringの中に入る
    } else {
      /* 入力された内容が数字であれば */
      /* そのまま数字を文字に変換して返す */
      return resule + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

/**
* コンテナ要素の中身をbodyElementで上書きする（今ある状態を空にして新しく追加する）
* @param {Element} bodyElement コンテナ要素の中身となる要素（追加する子要素）
* @param {Element} containerElement コンテナ要素(親要素)
*/

export function render(bodyElement, containerElement) {
  // containerElementの中身を空にする
  containerElement.innerHTML = "";
  // containerElementの直下にbodyElementを追加する
  containerElement.appendChild(bodyElement);
}
