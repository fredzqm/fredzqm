import * as convert from 'color-convert';
import {alphabet} from './alphabet';

class Vector {
  constructor(public x: number,
              public y: number,
              public z: number) {
  }
}

class Point {
  curPos: Vector;
  originalPos: Vector;
  targetPos: Vector;
  velocity: Vector;
  radius: number;
  size: number;
  bubbleShape: string = "Bubble";

  constructor(x: number, y: number, z: number, size: number, private color: string) {
    this.curPos = new Vector(x, y, z);
    this.originalPos = new Vector(x, y, z);
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
    this.radius = size;
    this.size = size;
  }

  update(config: any) {
    let dx = this.targetPos.x - this.curPos.x;
    let dy = this.targetPos.y - this.curPos.y;
    // Orthogonal vector is [-dy,dx]
    let ax = dx * config.springStrength - config.rotationForce * dy;
    let ay = dy * config.springStrength + config.rotationForce * dx;

    this.velocity.x += ax;
    this.velocity.x *= config.friction;
    this.curPos.x += this.velocity.x;

    this.velocity.y += ay;
    this.velocity.y *= config.friction;
    this.curPos.y += this.velocity.y;

    let dox = this.originalPos.x - this.curPos.x;
    let doy = this.originalPos.y - this.curPos.y;
    let dd = (dox * dox) + (doy * doy);
    let d = Math.sqrt(dd);

    this.targetPos.z = d / 100 + 1;
    let dz = this.targetPos.z - this.curPos.z;
    let az = dz * config.springStrength;
    this.velocity.z += az;
    this.velocity.z *= config.friction;
    this.curPos.z += this.velocity.z;

    this.radius = this.size * this.curPos.z;
    if (this.radius < 1)
      this.radius = 1;
  }

  draw(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
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

function hexToRgb(str) {
  const color = convert.keyword.hsl(str);
  if (color)
      return color;
  return convert.hex.hsl(str);
}

export class PointCollection {
  mousePos: Vector = new Vector(0, 0, 0);
  pointCollectionX: number = 0;
  pointCollectionY: number = 0;
  points: Point[];

  constructor(str: string, range: any, private config: any) {
    let letterColors = [];
    for (let colorCode of config.letterColors) {
      letterColors.push(hexToRgb(colorCode));
    }
    console.log(config.letterColors, letterColors);
    this.points = parsePoints(str, range, letterColors);
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];

      let dx = this.mousePos.x - point.curPos.x;
      let dy = this.mousePos.y - point.curPos.y;
      let dd = (dx * dx) + (dy * dy);
      let d = Math.sqrt(dd);

      if (d < 150) {
        point.targetPos = new Vector(point.curPos.x - dx, point.curPos.y - dy, 0);
      } else {
        point.targetPos = point.originalPos;
      }
      point.update(this.config);
    }
  }

  shake() {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      let dx = this.mousePos.x - point.curPos.x;
      let dy = this.mousePos.y - point.curPos.y;
      let dd = (dx * dx) + (dy * dy);
      let d = Math.sqrt(dd);
      if (d < 50) {
        this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
        this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
      }
    }
  }

  draw(ctx: any) {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      if (point === null)
        continue;
      point.draw(ctx, this.pointCollectionX, this.pointCollectionY);
    }
  }

  setMousePos(x: number, y: number) {
    this.mousePos = new Vector(x, y, 0);
  }
}
;

function makeColor(hslList, fade) {
  let hue = hslList[0] /*- 17.0 * fade / 1000.0*/;
  let sat = hslList[1] + 81.0 * fade / 1000.0;
  let lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/;
  return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}

function phraseToHex(phrase) {
  let hexphrase = "";
  for (let i = 0; i < phrase.length; i++) {
    hexphrase += phrase.charCodeAt(i).toString(16);
  }
  return hexphrase;
}

function parsePoints(str: string, range: any, letterColors: number[][]): Point[] {
  let border_percentage = 2 / (str.length + 4);

  let xmin = Number.MAX_VALUE;
  let ymin = Number.MAX_VALUE;
  let xmax = 0;
  let ymax = 0;

  let data = [];
  let offset = 0;

  function addLetter(cc_hex, ix, letterCols) {
    let chr_data = alphabet[cc_hex].P;
    let bc = letterColors[ix % letterColors.length];

    for (let i = 0; i < chr_data.length; ++i) {
      let point = chr_data[i];
      let x = point[0] + offset;
      xmin = Math.min(xmin, x);
      xmax = Math.max(xmax, x);
      let y = point[1];
      ymin = Math.min(ymin, y);
      ymax = Math.max(ymax, y);
      data.push({
        x: x,
        y: y,
        r: point[2],
        c: makeColor(bc, point[3])
      });
    }
    offset += alphabet[cc_hex].W;
  }

  let hexphrase = phraseToHex(str);
  let col_ix = -1;
  for (let i = 0; i < hexphrase.length; i += 2) {
    let cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
    if (cc_hex != "A20")
      col_ix++;
    addLetter(cc_hex, col_ix, letterColors);
  }

  let xmid = (xmin + xmax) / 2;
  let xcenter = (range.right + range.left) / 2;
  let ymid = (ymin + ymax) / 2;
  let ycenter = (range.top + range.buttom) / 2;
  let ratioX = (range.right - range.left) / (xmax - xmin);
  let ratioY = (range.buttom - range.top) / (ymax - ymin);
  let ratioR = Math.min(ratioX, ratioY);
  for (let i = 0; i < data.length; ++i) {
    let d = data[i];
    let x = (d.x - xmid) * ratioX + xcenter;
    let y = (d.y - ymid) * ratioY + ycenter;
    data[i] = new Point(x, y, 0.0, d.r * ratioR, d.c);
  }
  return data;
};
