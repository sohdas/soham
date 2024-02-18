function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-10');
  background(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let t = 0;
function draw() {
  background(255);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 100);

  push();
  stroke('#6d9071');
  strokeWeight(5.5);
  //loop for adding 100 lines
  for(let i = 0;i<100;i++){
    line(x1(t+i),y1(t+i),x2(t+i)+20,y2(t+i)+20);
  }
  pop();

  t+=0.15;
}

// function to change initial x co-ordinate of the line
function x1(t){
  return sin(t/10)*125+sin(t/20)*125+sin(t/30)*125;
}

// function to change initial y co-ordinate of the line
function y1(t){
  return cos(t/10)*125+cos(t/20)*125+cos(t/30)*125;
}

// function to change final x co-ordinate of the line
function x2(t){
  return sin(t/15)*125+sin(t/25)*125+sin(t/35)*125;
}

// function to change final y co-ordinate of the line
function y2(t){
  return cos(t/15)*125+cos(t/25)*125+cos(t/35)*125;
}
