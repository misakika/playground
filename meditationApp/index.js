const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle")
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display")
  const timeSelect = document.querySelectorAll(".time-select button")
  //Get the Length of the outline
  //getTotalLengthでsvgの全長を取得できる
  const outlineLength = outline.getTotalLength();
  //Duration
  //デフォルトでの秒数を指定
  let fakeDuration = 600;
  //線の間隔を指定する
  outline.style.strokeDasharray =outlineLength;
  //位置を指定する
  outline.style.strokeDashoffset = outlineLength;

  //pick different sound
  sounds.forEach(sound => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    })
  })

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song)
  });

  //select sound
  //時間ボタンを押されたらその時間のデータを受け取って時間を変更し、動いている秒数も変更する
  timeSelect.forEach(option => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time")
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${Math.floor(fakeDuration % 60)}`
    })
  })

  //create a funcrtion specific to stop and play the sounds
  //音楽が再生されているかを判断し、されていれば止める、されていなければながす
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      play.src = "./svg/pause.svg";
      video.play();
    } else {
      song.pause();
      play.src = "./svg/play.svg";
      video.pause();
    }
  }

  // We can animate the circle
  //ontimeupdate=>音楽が中断されたら
  song.ontimeupdate = () => {
    //currentTimeは現在の再生時間を表す
    let currentTime = song.currentTime;
    //全体の時間ー現在の再生時間なのでelapsedには残りの秒数が入る
    let elapsed = fakeDuration - currentTime;
    //残りの秒数を変数に格納
    let seconds = Math.floor(elapsed % 60);
    //残りの分数を変数に格納
    let minutes = Math.floor(elapsed / 60);

    //Animate the circle
    //progress = svgの全長 - ( 現在までの時間 / 全体の秒数 ) * svgの全長
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes} : ${seconds}`;

    //再生が終わったら止める
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  }
}

app();