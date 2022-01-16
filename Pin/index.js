const password = prompt("パスワードを決めてください。");
const nums = document.getElementsByClassName("num");
const login = false;

//パスワードが正しいか確認するメソッド
const checkKeyword=(password)=>{
  if(password === inputPassword){
    return true
  }else{
    console.log("正しいパスワードを入力してください")
  }
}
