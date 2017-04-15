class Vector {
    constructor(
        public x: number, 
        public y: number, 
        public z: number);

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Point() {
    color : any;
    friction : number = 0.85;
    rotationForce : number = 0.0;
    springStrength : number = 0.1;
    curPos : Vector;
    originalPos : Vector;
    targetPos : Vector;
    velocity : Vector;
    radius : number;
    size : number;
    bubbleShape : string = "Bubble";

    constructor(x: number, y: number, z: number, size: number, color: any) {
        this.curPos = new Vector(x,y,z);
        this.originalPos = new Vector(x,y,z);
        this.targetPos = new Vector(x,y,z);
        this.velocity = new Vector(0.0, 0.0, 0.0);
        this.radius = size;
        this.size = size;
    }

    update() {
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
        if (this.radius < 1) 
            this.radius = 1;
    }
 
    draw(ctx : CanvasRenderingContext2D, dx : number, dy : number) {
        ctx.fillStyle = this.color;
        if (this.bubbleShape == "square") {
            ctx.beginPath();
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else {
            ctx.beginPath();
            ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
}

export class PointCollection {
    mousePos : Vector = new Vector(0, 0, 0);
    pointCollectionX : number = 0;
    pointCollectionY : number = 0;
    points : Point[] = [];

    update() {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
 
            if (d < 150) {
                point.targetPos = new Vector(point.curPos.x - dx, point.curPos.y - dy, 0);
            } else {
                point.targetPos = point.originalPos;
            }
 
            point.update();
        }
    }

    shake () {
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
        }
        this.draw();
    };

    draw(ctx : CanvasRenderingContext2D) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            if (point === null)
                continue;
            point.draw(ctx, this.pointCollectionX, this.pointCollectionY);
        }
    };

    setMousePos(x : number, y : number) {
        this.mousePos = new Vector(x, y, 0);
    }
}





