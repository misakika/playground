function animatedForm(){
  const arrows = document.querySelectorAll(".fa-arrow-down")
  arrows.forEach(arrow=>{
    arrow.addEventListener("click", ()=>{
      //previousElementSiblingで一つ前の兄弟要素を取得できる
      const input = arrow.previousElementSibling;
      //parentElementで親要素を取得できる
      const parent = arrow.parentElement;
      //nextElementSiblingで次の兄弟要素を取得できる。
      const nextForm = parent.nextElementSibling;
    })
  })
}

animatedForm();