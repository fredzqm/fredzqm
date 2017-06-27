import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {PointCollection} from './pointCollection';

@Component({
  selector: 'app-hello',
  template: `
  <canvas #myCanvas class='chess-diag' [height]="height" [width]="width"></canvas>
  `,
  styles: [`
  	:host canvas {
  		width: 100%;
  		height: 100%;
      background: #CAC4A8;
  	}
  `]
})
export class HelloComponent implements OnInit {
  pointCollectionList: PointCollection[] = [];
  height = 600;
  width = 2000;

  @ViewChild('myCanvas') canvas;

  constructor() {
  }

  ngOnInit() {
    const a = new PointCollection('Hello, I am  Fred  Zhang!',
      {
        left: this.width * 0.1,
        right: this.width * 0.8,
        top: this.height * 0.25,
        buttom: this.height * 0.55
      }, {
        friction: 0.85,
        rotationForce: 0.0,
        springStrength: 0.1,
        letterColors: ['#1E055F', '#2B136A', '#5D507F', '#4C0D67', '#41025C']
      });
    const aRepeat = () => {
      a.shake();
      setTimeout(aRepeat, 20);
    };
    aRepeat();
    this.pointCollectionList.push(a);


    const b = new PointCollection('A passionate  programmer~~',
      {
        left: this.width * 0.3,
        right: this.width * 0.9,
        top: this.height * 0.67,
        buttom: this.height * 0.8
      }, {
        friction: 0.85,
        rotationForce: 0.0,
        springStrength: 0.1,
        letterColors: ['#94990D', '#848900', '#B5B86C']
      });
    const bRepeat = () => {
      b.update();
      setTimeout(bRepeat, 20);
    };
    bRepeat();
    this.pointCollectionList.push(b);

    this.startRepainter(10);
  }

  startRepainter(interval: number) {
    const repeat = () => {
      const ctx = this.canvas.nativeElement.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      for (const pc of this.pointCollectionList) {
        pc.draw(ctx);
      }
      setTimeout(repeat, interval);
    };
    repeat();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(e: MouseEvent) {
    const native = this.canvas.nativeElement;
    const xPos = (e.pageX - native.offsetLeft) / native.offsetWidth * this.width;
    const yPos = (e.pageY - native.offsetTop) / native.offsetHeight * this.height;
    this.setAllMousePosition(xPos, yPos);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseleave(e: MouseEvent) {
    for (const pc of this.pointCollectionList) {
      pc.setMousePos(Number.MAX_VALUE, Number.MAX_VALUE);
    }
  }

  setAllMousePosition(xPos: number, yPos: number) {
    for (const pc of this.pointCollectionList) {
      pc.setMousePos(xPos, yPos);
    }
  }

}
