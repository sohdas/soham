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
  strokeWeight(3);
  strokeJoin(ROUND);
  noFill();
  //loop for adding 100 lines
  for(let i = 0;i<20;i++){
    triangle(x1(t+i),y1(t+i),x2(t+i)+20,y2(t+i)+20, x2(t+i) - y1(t+i), y2(t-i) - x1(t-i));
    //line(x1(t + i), y1(t + i), x2(t + i), y2(t + i));
  }
  pop();

  t+=0.25;
}

const MAG = 250;

// function to change initial x co-ordinate of the line
function x1(t){
  return sin(t/10)*MAG+sin(t/20)*MAG+sin(t/30)*MAG;
}

// function to change initial y co-ordinate of the line
function y1(t){
  return cos(t/10)*MAG+cos(t/20)*MAG+cos(t/30)*MAG;
}

// function to change final x co-ordinate of the line
function x2(t){
  return sin(t/15)*MAG+sin(t/25)*MAG+sin(t/35)*MAG;
}

// function to change final y co-ordinate of the line
function y2(t){
  return cos(t/15)*MAG+cos(t/25)*MAG+cos(t/35)*MAG;
}
