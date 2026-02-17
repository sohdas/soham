function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-10');
  pixelDensity(1);
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);

  s = createShader(vertSource, fragSource);
  
  background(255);
}

function preload(){
  vertSource = loadStrings('shader.vert');
  fragSource = loadStrings('shader.frag');
}


function draw() {
  background(255);
  s.setUniform('u_resolution', [width, height]);
  s.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  s.setUniform("u_time", frameCount);

  shader(s);

  push();
}