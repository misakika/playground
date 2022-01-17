class PinLogin {
  //インスタンス生成のための型を作る
  constructor({ el, loginEndpoint, redirectTo, maxNumbers = Infinity }) {
    this.el = {
      //main: mainPinLogin
      main: el,
      numPad: el.querySelector(".pin-login__numpad"),
      textDisplay: el.querySelector(".pin-login__text")
    }
    //login.phpファイル
    this.loginEndpoint = loginEndpoint;
    //ログイン画面ファイル
    this.redirectTo = redirectTo;
    //pinの最高数（４）
    this.maxNumbers = maxNumbers;
    this.value = "";
    //数字のボタンの並びを変更する
    this._generatePad();
  }
  _generatePad() {
    const padLayout = [
      "1", "2", "3",
      "4", "5", "6",
      "7", "8", "9",
      "←", "0", "✔︎"
    ]

    padLayout.forEach(key => {
      const insertBreak = key.search(/[369]/) !== -1;
      const keyEl = document.createElement("div");
      keyEl.classList.add("pin-login__key");
      // iEl.classList.toggle("fas fa-backspace", isNaN(key));
      keyEl.textContent = key;
      keyEl.addEventListener("click", () => {
        this._handleKeyPress(key)
      });
      this.el.numPad.appendChild(keyEl);
      if (insertBreak) {
        this.el.numPad.appendChild(document.createElement("br"));
      }
    })
  }
  _handleKeyPress(key){
    switch(key){
      case "←":
        this.value.substring(0,this.value.length -1);
      break;
      case "✔︎":
       this._attemptLogin();
       break;
      default : if(this.value.length < this.maxNumbers && !isNaN(key)){
        this.value += key;
        break;
      }
    }
    this._updateValueText();
  }
  _updateValueText(){
    this.el.textDisplay.value = "_".repeat(this.value.length);
  }

  _attemptLogin() {
    if(this.value.length > 0) {
      fetch(this.loginEndpoint,{
        method:"post",
        headers: {
          "Content-Type":"application/x-www-form-urlencoded"
        },
        body: `pincode=${this.value}`
      }).then(response => {
        if(response.status === 200){
          window.location.href = this.redirectTo;
        }
      })
    }
  }
}