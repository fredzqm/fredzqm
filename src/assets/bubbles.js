
function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
 
    this.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
}
 
function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;
    this.points = [];
 
    this.update = function () {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
 
            point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
            point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;
 
            point.update();
        }
    };
 
    this.shake = function () {
        // var randomNum = Math.floor(Math.random() * 5) - 2;
 
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
            if (d < 50) {
                this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
                this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
            }
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };
 
    this.draw = function (bubbleShape, reset) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            if (point === null)
                continue;
 
            if (window.reset) {
                this.pointCollectionX = 0;
                this.pointCollectionY = 0;
                this.mousePos = new Vector(-1000, -1000);
            }
 
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };
 
    this.reset = function (bubbleShape) {};
}

function Point(x, y, z, size, color) {
    this.curPos = new Vector(x , y , z );
    this.color = color;
 
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = 0.1;
 
    this.originalPos = new Vector(x,y,z);
    this.targetPos = new Vector(x,y,z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
    this.radius = size;
    this.size = size;
    
    this.update = function () {
        var dx = this.targetPos.x - this.curPos.x;
        var dy = this.targetPos.y - this.curPos.y;
        // Orthogonal vector is [-dy,dx]
        var ax = dx * this.springStrength - this.rotationForce * dy;
        var ay = dy * this.springStrength + this.rotationForce * dx;
 
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;
 
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;
 
        var dox = this.originalPos.x - this.curPos.x;
        var doy = this.originalPos.y - this.curPos.y;
        var dd = (dox * dox) + (doy * doy);
        var d = Math.sqrt(dd);
 
        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;
 
        this.radius = this.size * this.curPos.z;
        if (this.radius < 1) this.radius = 1;
    };
 
    this.draw = function (bubbleShape, dx, dy) {
        ctx.fillStyle = this.color;
        if (bubbleShape == "square") {
            ctx.beginPath();
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else {
            ctx.beginPath();
            ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
}
 
function makeColor(hslList, fade) {
    var hue = hslList[0] /*- 17.0 * fade / 1000.0*/ ;
    var sat = hslList[1] /*+ 81.0 * fade / 1000.0*/ ;
    var lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/ ;
    return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}
 
function phraseToHex(phrase) {
    var hexphrase = "";
    for (var i = 0; i < phrase.length; i++) {
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    return hexphrase;
}
 
function initEventListeners() {
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
 
    canvas.ontouchmove = function (e) {
        e.preventDefault();
        onTouchMove(e);
    };
 
    canvas.ontouchstart = function (e) {
        e.preventDefault();
    };
}
 
function onMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}
 
function onTouchMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}
 
function bounceName() {
    draw();
    shake();
    setTimeout(bounceName, 30);
}
 
function bounceBubbles() {
    draw();
    update();
    setTimeout(bounceBubbles, 30);
}
 
function draw(reset) {
    var tmpCanvas = canvas.get(0);
 
    if (tmpCanvas.getContext === null) {
        return;
    }
 
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
 
    if (pointCollection) {
        pointCollection.draw(bubbleShape, reset);
    }
}
 
function shake() {
    var tmpCanvas = canvas.get(0);
 
    if (tmpCanvas.getContext === null) {
        return;
    }
 
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
 
    if (pointCollection) {
        pointCollection.shake(bubbleShape);
    }
}
 
function update() {
    if (pointCollection)
        pointCollection.update();
}
 
 
window.reset = false;
 
$(window).mouseleave(function () {
    window.reset = true;
});
 
$(window).mouseenter(function () {
    window.reset = false;
});
 
var canvas;
var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;
 
document.rotationForce = 0.0;
document.Friction = 0.85;

var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];




