let button1, button2, button3, button4, button5;
let sprite1Img, sprite2Img;
let frame1 = 0, frame2 = 0;
let sprite1Frames = [];
let sprite2Frames = [];
let iframe; // 儲存 iframe 的變數
let stars = []; // 儲存星形的陣列
let dropdown; // 儲存下拉式選單的變數
let textBox; // 儲存文字框的變數
let snowflakes = []; // 儲存雪花的陣列
let snowHeight = 0; // 螢幕下方的積雪高度
let snowflakeImg; // 雪花圖片
let gifImg; // 儲存 123.gif 的變數

function preload() {
  sprite1Img = loadImage('00.png', () => console.log('00.png loaded'), () => console.error('Failed to load 00.png'));
  sprite2Img = loadImage('01.png', () => console.log('01.png loaded'), () => console.error('Failed to load 01.png'));
  snowflakeImg = loadImage('000.png', () => console.log('雪花圖片載入成功'), () => console.error('雪花圖片載入失敗'));
  gifImg = loadImage('123.gif', () => console.log('123.gif 載入成功'), () => console.error('123.gif 載入失敗')); // 載入 123.gif
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗的寬度和高度

  // 定義彈跳動畫樣式
  addBounceAnimationStyle();

  // 初始化雪花
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake(random(width), random(-height, 0))); // 隨機生成雪花
  }

  // 新增「首頁」按鈕
  button1 = createButton('首頁');
  button1.position(50, 50);
  button1.size(120, 60); // 設置為橢圓形
  button1.style('font-size', '20px');
  button1.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button1.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button1.style('background-color', '#ff6f61'); // 背景顏色
  button1.style('color', '#fff'); // 字體顏色
  button1.mousePressed(() => {
    if (iframe) {
      iframe.remove(); // 移除 iframe
      iframe = null;
    }
    if (dropdown) {
      dropdown.hide(); // 隱藏下拉式選單
    }
    if (textBox) {
      textBox.remove(); // 移除文字框
    }
    console.log('回到首頁，畫面已清空');
  });

  // 新增「自我介紹」按鈕
  button2 = createButton('自我介紹');
  button2.position(200, 50);
  button2.size(120, 60); // 設置為橢圓形
  button2.style('font-size', '20px');
  button2.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button2.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button2.style('background-color', '#6a5acd'); // 背景顏色
  button2.style('color', '#fff'); // 字體顏色
  button2.mousePressed(() => {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
    if (textBox) {
      textBox.remove();
    }
    textBox = createDiv(
      '哈囉～我是許孟婕！<br>' +
      '目前在淡江大學讀教科系一年級，畢業於新莊高中。<br>' +
      '平時的興趣愛好就是追劇、看動漫、跑咖啡廳、購物等等，生活日常基本上圍繞著「療癒」和「放鬆」展開<br>' +
      '題外話我超喜歡日本，不管是文化、美食還是風景都超吸引我，希望未來每年都可以安排去玩好幾次👍👍👍<br>' +
      '這次的作品對我來說是一次全新的挑戰，雖然過程中也遇到一些卡關的時候，但能做出畫面上自己喜歡的樣子真的很開心！<br>' +
      '希望透過這次的創作，我可以學到更多實用的技能，也慢慢找到自己在設計或科技應用上的興趣方向～<br>' +
      '謝謝大家！<br>' +
      '────────────────୨ৎ────────────────'
    );
    textBox.position(windowWidth / 2 - 250, windowHeight / 2 - 200);
    textBox.size(500, 400);
    textBox.style('font-size', '20px');
    textBox.style('font-family', '"Comic Sans MS", "Comic Sans", cursive');
    textBox.style('color', '#333');
    textBox.style('background-color', '#f9f9f9');
    textBox.style('padding', '20px');
    textBox.style('border-radius', '15px');
    textBox.style('box-shadow', '0 0 20px rgba(0, 0, 0, 0.3)');
    textBox.style('text-align', 'center');
    textBox.style('animation', 'bounceIn 0.5s ease'); // 添加彈跳動畫
  });

  // 新增「作品集」按鈕
  let button3 = createButton('作品集');
  button3.position(350, 50); // 調整按鈕位置
  button3.size(120, 60); // 設置為橢圓形（寬度大於高度）
  button3.style('font-size', '20px');
  button3.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button3.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button3.style('background-color', '#ffa500'); // 背景顏色
  button3.style('color', '#fff'); // 字體顏色
  button3.mousePressed(() => {
    if (!dropdown) {
      // 如果下拉式選單尚未建立，則建立
      dropdown = createSelect();
      dropdown.position(350, 130); // 下拉式選單的位置，避免與按鈕重疊
      dropdown.size(150, 40); // 增加選單的寬度和高度
      dropdown.style('font-size', '18px'); // 調整字體大小
      dropdown.style('background-color', '#f0f0f0'); // 設置背景顏色
      dropdown.style('color', '#333'); // 設置文字顏色
      dropdown.style('border', '2px solid #ffa500'); // 添加邊框
      dropdown.style('border-radius', '10px'); // 添加圓角
      dropdown.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)'); // 添加陰影
      dropdown.style('padding', '5px'); // 添加內邊距
      dropdown.style('z-index', '1000'); // 設置 z-index，確保在上層
      dropdown.style('position', 'absolute'); // 確保 z-index 生效
      dropdown.option('請選擇');
      dropdown.option('作品 1');
      dropdown.option('作品 2');
      dropdown.option('作品 3');
      dropdown.option('作品 4');
      dropdown.option('期中HACKMD');
      dropdown.changed(() => {
        const selected = dropdown.value();
        console.log(`選擇了: ${selected}`);
        // 根據選擇的項目執行對應的操作
        if (selected === '作品 1') {
          showIframe('https://mj1119-c.github.io/week1/');
        } else if (selected === '作品 2') {
          showIframe('https://mj1119-c.github.io/seaweed/');
        } else if (selected === '作品 3') {
          showIframe('https://mj1119-c.github.io/week3/');
        } else if (selected === '作品 4') {
          showIframe('https://mj1119-c.github.io/week4/');
        } else if (selected === '期中HACKMD') {
          showIframe('https://hackmd.io/@HSGKLoDOSMSkfc8lYd7CKw/BJmLPwZQ1g');
        }
      });
    } else {
      // 如果下拉式選單已存在，則切換顯示/隱藏
      if (dropdown.elt.style.display === 'none') {
        dropdown.show();
      } else {
        dropdown.hide();
      }
    }
  });

  // 新增「測驗券」按鈕
  let button4 = createButton('測驗卷');
  button4.position(500, 50);
  button4.size(120, 60); // 設置為橢圓形
  button4.style('font-size', '20px');
  button4.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button4.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button4.style('background-color', '#32cd32'); // 背景顏色
  button4.style('color', '#fff'); // 字體顏色
  button4.mousePressed(() => {
    showIframe('https://mj1119-c.github.io/test/');
    if (dropdown) {
      dropdown.hide(); // ���藏下拉式選單
    }
  });

  // 新增「教學影片」按鈕
  let button5 = createButton('教學影片');
  button5.position(650, 50);
  button5.size(120, 60); // 設置為橢圓形
  button5.style('font-size', '20px');
  button5.style('border-radius', '30px'); // 圓角設置為高度的一半，形成橢圓形
  button5.style('box-shadow', '0 0 15px rgba(255, 255, 255, 0.8)'); // 發光效果
  button5.style('background-color', '#ff4500'); // 背景顏色
  button5.style('color', '#fff'); // 字體顏色
  button5.mousePressed(() => showIframe('https://cfchen58.synology.me/程式設計2024/B2/week3/20250303_104548.mp4'));

  // 將精靈圖分割成小圖
  for (let i = 0; i < 6; i++) {
    sprite1Frames.push(sprite1Img.get(i * 38, 0, 38, 34));
    sprite2Frames.push(sprite2Img.get(i * 36, 0, 36, 36));
  }

  for (let i = 0; i < 50; i++) {
    // 初始化 50 顆星形
    stars.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      speedX: random(-2, 2),
      speedY: random(-2, 2),
      color: color(random(255), random(255, 255))
    });
  }
}

function draw() {
  background(20, 20, 50); // 深藍色背景

  // 根據滑鼠位置調整雪花速度
  let speedMultiplier = map(mouseX, 0, width, 0.5, 3); // 滑鼠往左速度變慢，往右速度變快

  // 更新並顯示雪花
  for (let snowflake of snowflakes) {
    snowflake.update(speedMultiplier);
    snowflake.show();
  }

  // 繪製積雪
  drawSnowPile();

  // 增加積雪高度
  if (frameCount % 60 === 0) { // 每秒增加積雪高度
    snowHeight = min(snowHeight + 1, height / 4); // 限制積雪高度不超過畫布的 1/4
  }

  // 顯示 123.gif
  if (gifImg) {
    image(gifImg, 20, height - 220, 200, 200); // 將 gif 顯示在左下角，大小為 200x200
  }
}

// 雪花類別
class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 40); // 雪花大小
    this.speedY = random(1, 3); // 雪花垂直速度
    this.speedX = random(-1, 1); // 雪花水平漂移速度
  }

  update(speedMultiplier) {
    this.y += this.speedY * speedMultiplier;
    this.x += this.speedX * speedMultiplier;

    if (this.y > height - snowHeight) {
      this.y = random(-50, 0);
      this.x = random(width);
    }

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
  }

  show() {
    if (snowflakeImg) {
      image(snowflakeImg, this.x, this.y, this.size, this.size);
    }
  }
}

// 繪製積雪
function drawSnowPile() {
  noStroke();
  fill(255); // 白色積雪
  rect(0, height - snowHeight, width, snowHeight); // 繪製積雪矩形
}

function showIframe(url) {
  // 如果已經有 iframe，先移除
  if (iframe) {
    iframe.remove();
  }

  // 新增 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.position(windowWidth * 0.1, windowHeight * 0.2); // 設置 iframe 的位置
  iframe.size(windowWidth * 0.8, windowHeight * 0.7); // 設置 iframe 的大小
  iframe.style('animation', 'bounceIn 0.5s ease'); // 添加彈跳動畫
  iframe.style('border-radius', '15px'); // 設置圓角
  iframe.style('box-shadow', '0 0 20px rgba(0, 0, 0, 0.3)'); // 添加陰影
}

function addBounceAnimationStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes bounceIn {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}
