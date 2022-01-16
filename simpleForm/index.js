function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-down")
  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      //previousElementSiblingで一つ前の兄弟要素を取得できる
      const input = arrow.previousElementSibling;
      //parentElementで親要素を取得できる
      const parent = arrow.parentElement;
      //nextElementSiblingで次の兄弟要素を取得できる。
      const nextForm = parent.nextElementSibling;

      //check for validation
      //入力されたものをバリデーションにかけて処理を変える
      if (input.type === "text" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "password" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
      //もし正しい値が入力されなかったらフォームを揺らしてエラーを伝える
        parent.style.animation = "shake 0.5s ease"
      }
      //animationendイベントとはアニメーションが終了したときに発生する
      //これがないと連続でエラーが発生した場合も一度目のcssしか反映されない
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      })
    });
  });
}
//userの中身をバリデーションにかける関数
//不正であればerror関数に背景色（赤）を渡し、正しければ緑を渡した上でtrueを返す
function validateUser(user) {
  if (user.value.length < 3) {
    console.log("not enough characters");
    error("rgb(189,87,87");
  } else {
    error("rgb(87,189,130)");
    return true;
  }
}

//emailをバリデーションにかける。
//正しければ背景色緑をerror関数に渡し、trueを返す。不正であれば赤を渡す
function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validation.test(email.value)) {
    error("rgb(87,189,130)");
    return true;
  } else {
    error("rgb(189,87,87)");
  }
}

//渡ってきた色を背景色に設定する関数
function error(color) {
  document.body.style.backgroundColor = color;
}

//次のフォームに移る関数。クラスを追加・削除してステートを変更する。
function nextSlide(parent, nextForm) {
  parent.classList.add("innactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

animatedForm();