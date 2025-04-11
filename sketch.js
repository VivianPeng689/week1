let points = [
  [-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], 
  [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]
];

let patterns = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3');  // 載入背景音樂
}

function setup() {  //設定
  createCanvas(windowWidth, windowHeight);  //建立畫布，畫布的寬為400，高為400
  song.loop();  // 播放背景音樂
  amplitude = new p5.Amplitude();

  for (let i = 0; i < 10; i++) {
    patterns.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(10, 30),
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() { //畫圖
  background('#4a5759');  //背景色為灰色
  strokeWeight(5);  //設定畫筆粗細為5

  let level = amplitude.getLevel();
  let bounceFactor = map(level, 0, 1, 0.5, 2);  // 根據音樂振幅調整跳動幅度

  for (let pattern of patterns) {
    push();
    translate(pattern.x, pattern.y);  // 移動原點到圖案位置
    scale(pattern.size / 20 * bounceFactor);  // 調整圖案大小
    stroke(pattern.color);  // 設定畫筆顏色

    for (let i = 0; i < points.length - 1; i++) {
      let x1 = points[i][0] * 20;
      let y1 = points[i][1] * 20;
      let x2 = points[i + 1][0] * 20;
      let y2 = points[i + 1][1] * 20;
      line(x1, y1, x2, y2);  // 畫線
    }

    // Connect the last point to the first point
    let x1 = points[points.length - 1][0] * 20;
    let y1 = points[points.length - 1][1] * 20;
    let x2 = points[0][0] * 20;
    let y2 = points[0][1] * 20;
    line(x1, y1, x2, y2);  // 畫線

    pop();

    pattern.x += pattern.dx;
    pattern.y += pattern.dy;

    if (pattern.x < 0 || pattern.x > width) pattern.dx *= -1;
    if (pattern.y < 0 || pattern.y > height) pattern.dy *= -1;
  }
}
