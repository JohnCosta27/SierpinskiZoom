let triangles = [];
let limit = 5;

let zoom = 1;

let width = 0;
let height = 0;

window.addEventListener("wheel", runOnScroll);

window.onload = function() {

  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  width = canvas.width;
  height = canvas.height;

  context.translate(width / 2, height / 2);

  context.fillStyle = 'white';
  context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  let p0 = {x: 0, y: -321};
  let p1 = {x: 278, y: 160};
  let p2 = {x: -278, y: 160};

  sierpinski(p0, p1, p2, 10);
  draw();

}

function draw() {

  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  for (let triangle of triangles) {
    drawTriangle(triangle.p0, triangle.p1, triangle.p2);
  }

}

function sierpinski(p0, p1, p2, limit) {

  if (limit > 0) {

    let pA = {x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2};
    let pB = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2};
    let pC = {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};

    sierpinski(p0, pA, pB, limit - 1);
    sierpinski(pA, p2, pC, limit - 1);
    sierpinski(pB, pC, p1, limit - 1);

  } else {
    triangles.push({p0: p0, p1: p1, p2: p2});
  }

}

function rescale(x, y) {

  for (let triangle of triangles) {

    triangle.p0.x -= x;
    triangle.p0.y -= y;
    triangle.p1.x -= x;
    triangle.p1.y -= y;
    triangle.p2.x -= x;
    triangle.p2.y -= y;

    triangle.p0.x *= zoom;
    triangle.p0.y *= zoom;
    triangle.p1.x *= zoom;
    triangle.p1.y *= zoom;
    triangle.p2.x *= zoom;
    triangle.p2.y *= zoom;

    triangle.p0.x += x;
    triangle.p0.y += y;
    triangle.p1.x += x;
    triangle.p1.y += y;
    triangle.p2.x += x;
    triangle.p2.y += y;

  }

  draw();

}

function drawTriangle(p0, p1, p2) {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.fillStyle = 'black';
  context.beginPath();
  context.moveTo(p0.x, p0.y);
  context.lineTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.fill();
}

function runOnScroll(e) {
  console.log(e)
  if (e.deltaY < 0) {
    zoom = 1.1;
    rescale(e.pageX - width/2, e.pageY - height/2);
  } else if (e.deltaY > 0) {
    zoom = 9/12;
    rescale(e.pageX - width/2, e.pageY - height/2);
  }
}
