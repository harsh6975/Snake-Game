function init() {
  canvas = document.getElementById("canvas");
  W = canvas.width = 800;
  H = canvas.height = 800;
  cellSize = 52;
  food = getFood();
  pen = canvas.getContext("2d");
  gstart = false;
  gameover = false;
  foodImg = new Image();
  foodImg.src = "apple.png";
  snake = {
    length: 5,
    color: "blue",
    cells: [],
    dir: "right",
    preDir: "right",
    createSnake: function () {
      for (var i = this.length; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      pen.fillStyle = this.color;
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillRect(
          this.cells[i].x * cellSize,
          this.cells[i].y * cellSize,
          cellSize - 2,
          cellSize - 2
        );
      }
    },

    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;
      var lastX = Math.round((W ) / cellSize);
      var lastY = Math.round((W ) / cellSize);
      if (headX == lastX || headY == lastY || headX < 0 || headY < 0) {
        gameover = true;
      }
      if (food.x == headX && food.y == headY) {
        food = getFood();
      } else {
        this.cells.pop();
      }

      var X = headX,
        Y = headY;
      if (this.dir == "right") {
        X += 1;
      } else if (this.dir == "down") {
        Y += 1;
      } else if (this.dir == "left") {
        X -= 1;
      } else {
        Y -= 1;
      }
      this.cells.unshift({ x: X, y: Y });
    },
  };
  snake.createSnake();

  function keyPressed(e) {
    if (e.key == "ArrowRight" && snake.preDir !== "left") {
      snake.dir = "right";
      snake.preDir = "right";
    } else if (e.key == "ArrowLeft" && snake.preDir !== "right") {
      snake.dir = "left";
      snake.preDir = "left";
    } else if (e.key == "ArrowDown" && snake.preDir !== "up") {
      snake.dir = "down";
      snake.preDir = "down";
    } else if (e.key == "ArrowUp" && snake.preDir !== "down") {
      snake.dir = "up";
      snake.preDir = "up";
    }
  }

  document.addEventListener("keydown", keyPressed);
}

init();

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(
    foodImg,
    food.x * cellSize,
    food.y * cellSize,
    cellSize,
    cellSize
  );
}
function update() {
  // console.log("update");
  snake.updateSnake();
}

function gameloop() {
  if (gameover == true) {
    clearInterval(f);
    alert("Game over");
    init();
    return;
  }
  update();
  draw();
}
function start() {
  if (gstart === false) {
    //console.log('start');
    gstart = true;
    f = setInterval(gameloop, 200);
  }
}
function pause() {
  if (gstart === true) {
    gstart = false;
    // console.log('stop');
    clearInterval(f);
  }
}

function getFood() {
  var foodX = Math.round((Math.random() * (W - cellSize)) / 52);
  var foodY = Math.round((Math.random() * (W - 52)) / 52);
  food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}
