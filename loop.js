function init() {
  canvas = document.getElementById("canvas");
  gstart=false;
  W = canvas.width = 800;
  H = canvas.height = 800;
  pen = canvas.getContext("2d");
  rect = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    speed: 40,
  };
}
init();

function draw() {
  pen.clearRect(0, 0, W, H);
  pen.fillStyle = "red";
  pen.fillRect(rect.x, rect.y, rect.w, rect.h);
}
draw();

function update() {
  //console.log("update");
  rect.x += rect.speed;
  if (rect.x >= W - rect.w || rect.x <= 0) {
    rect.speed *= -1;
  }
}

function gameloop() {
  update();
  draw();
}

function start(){
    if(gstart===false){
        //console.log('start');
        gstart=true;
        f=setInterval(gameloop,200);
    }
    
}
function stop(){
   if(gstart===true){
       gstart=false;
      // console.log('stop');
       clearInterval(f);
   }
}
