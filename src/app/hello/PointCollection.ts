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
  bubbleShape = 'Bubble';

  constructor(x: number, y: number, z: number, size: number, private color: string) {
    this.curPos = new Vector(x, y, z);
    this.originalPos = new Vector(x, y, z);
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
    this.radius = size;
    this.size = size;
  }

  update(config: any) {
    const dx = this.targetPos.x - this.curPos.x;
    const dy = this.targetPos.y - this.curPos.y;
    // Orthogonal vector is [-dy,dx]
    const ax = dx * config.springStrength - config.rotationForce * dy;
    const ay = dy * config.springStrength + config.rotationForce * dx;

    this.velocity.x += ax;
    this.velocity.x *= config.friction;
    this.curPos.x += this.velocity.x;

    this.velocity.y += ay;
    this.velocity.y *= config.friction;
    this.curPos.y += this.velocity.y;

    const dox = this.originalPos.x - this.curPos.x;
    const doy = this.originalPos.y - this.curPos.y;
    const dd = (dox * dox) + (doy * doy);
    const d = Math.sqrt(dd);

    this.targetPos.z = d / 100 + 1;
    const dz = this.targetPos.z - this.curPos.z;
    const az = dz * config.springStrength;
    this.velocity.z += az;
    this.velocity.z *= config.friction;
    this.curPos.z += this.velocity.z;

    this.radius = this.size * this.curPos.z;
    if (this.radius < 1)
      this.radius = 1;
  }

  draw(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
    ctx.fillStyle = this.color;
    if (this.bubbleShape == 'square') {
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
  try {
    if (str[0] === '#')
      return convert.hex.hsl(str);
    else
      return convert.keyword.hsl(str);
  } catch (e) {
    console.log(str + ' cannot be converted into color');
    return [0, 0, 0];
  }
}

export class PointCollection {
  mousePos: Vector = new Vector(0, 0, 0);
  pointCollectionX = 0;
  pointCollectionY = 0;
  points: Point[];

  constructor(str: string, range: any, private config: any) {
    const letterColors = [];
    for (const colorCode of config.letterColors) {
      letterColors.push(hexToRgb(colorCode));
    }
    this.points = parsePoints(str, range, letterColors);
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];

      const dx = this.mousePos.x - point.curPos.x;
      const dy = this.mousePos.y - point.curPos.y;
      const dd = (dx * dx) + (dy * dy);
      const d = Math.sqrt(dd);

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
      const point = this.points[i];
      const dx = this.mousePos.x - point.curPos.x;
      const dy = this.mousePos.y - point.curPos.y;
      const dd = (dx * dx) + (dy * dy);
      const d = Math.sqrt(dd);
      if (d < 50) {
        this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
        this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
      }
    }
  }

  draw(ctx: any) {
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
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
  const hue = hslList[0] /*- 17.0 * fade / 1000.0*/;
  const sat = hslList[1] + 81.0 * fade / 1000.0;
  const lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/;
  return 'hsl(' + hue + ',' + sat + '%,' + lgt + '%)';
}

function phraseToHex(phrase) {
  let hexphrase = '';
  for (let i = 0; i < phrase.length; i++) {
    hexphrase += phrase.charCodeAt(i).toString(16);
  }
  return hexphrase;
}

function parsePoints(str: string, range: any, letterColors: number[][]): Point[] {
  const border_percentage = 2 / (str.length + 4);

  let xmin = Number.MAX_VALUE;
  let ymin = Number.MAX_VALUE;
  let xmax = 0;
  let ymax = 0;

  const data = [];
  let offset = 0;

  function addLetter(cc_hex, ix, letterCols) {
    const chr_data = alphabet[cc_hex].P;
    const bc = letterColors[ix % letterColors.length];

    for (let i = 0; i < chr_data.length; ++i) {
      const point = chr_data[i];
      const x = point[0] + offset;
      xmin = Math.min(xmin, x);
      xmax = Math.max(xmax, x);
      const y = point[1];
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

  const hexphrase = phraseToHex(str);
  let col_ix = -1;
  for (let i = 0; i < hexphrase.length; i += 2) {
    const cc_hex = 'A' + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
    if (cc_hex != 'A20')
      col_ix++;
    addLetter(cc_hex, col_ix, letterColors);
  }

  const xmid = (xmin + xmax) / 2;
  const xcenter = (range.right + range.left) / 2;
  const ymid = (ymin + ymax) / 2;
  const ycenter = (range.top + range.buttom) / 2;
  const ratioX = (range.right - range.left) / (xmax - xmin);
  const ratioY = (range.buttom - range.top) / (ymax - ymin);
  const ratioR = Math.min(ratioX, ratioY);
  for (let i = 0; i < data.length; ++i) {
    const d = data[i];
    const x = (d.x - xmid) * ratioX + xcenter;
    const y = (d.y - ymid) * ratioY + ycenter;
    data[i] = new Point(x, y, 0.0, d.r * ratioR, d.c);
  }
  return data;
};
