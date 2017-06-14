import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { PointCollection } from './pointCollection';

@Component({
  selector: 'app-hello',
  template: `
  <canvas #myCanvas class='chess-diag' [height]="height" [width]="width"></canvas>
  `,
  styles:[`
  	:host canvas {
  		width: 100%;
  		height: 100%;
      background: url("../assets/yosemite.jpg") no-repeat center center fixed;
  	}
  `]
})
export class HelloComponent implements OnInit {
	pointCollectionList : PointCollection[] = [];
  height : number = 600;
  width : number = 2000;

	@ViewChild("myCanvas") canvas;

  constructor() { }

  ngOnInit() {
  	let a = new PointCollection("Hello, I am  Fred  Zhang!",
    {
      left: this.width * 0.1 ,
      right: this.width * 0.8 ,
      top: this.height * 0.25,
      buttom: this.height * 0.55
    } , {
      friction : 0.85,
      rotationForce : 0.0,
      springStrength : 0.1
    });
    let aRepeat = () => {
      a.shake();
      setTimeout(aRepeat, 20);
    };
    aRepeat();
    this.pointCollectionList.push(a);


    let b = new PointCollection("A passionate  programmer~~",
    {
      left: this.width * 0.3 ,
      right: this.width * 0.9,
      top: this.height * 0.67,
      buttom: this.height * 0.8
    } , {
      friction : 0.85,
      rotationForce : 0.0,
      springStrength : 0.1
    });
    let bRepeat = () => {
      b.update();
      setTimeout(bRepeat, 20);
    };
    bRepeat();
    this.pointCollectionList.push(b);

    this.startRepainter(10);
  }

  startRepainter(interval: number) {
    let repeat = () => {
      let ctx = this.canvas.nativeElement.getContext("2d");
      ctx.clearRect(0, 0, this.width, this.height);
      for (let pc of this.pointCollectionList) {
        pc.draw(ctx);
      }
      setTimeout(repeat, interval);
    };
    repeat();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(e: MouseEvent) {
  	let native = this.canvas.nativeElement;
    let xPos = (e.pageX - native.offsetLeft) / native.offsetWidth *  this.width;
    let yPos = (e.pageY - native.offsetTop)  / native.offsetHeight * this.height;
    this.setAllMousePosition(xPos, yPos);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseleave(e: MouseEvent) {
    for (let pc of this.pointCollectionList) {
      pc.setMousePos(Number.MAX_VALUE, Number.MAX_VALUE);
    }
  }

  setAllMousePosition(xPos: number, yPos: number) {
    for (let pc of this.pointCollectionList) {
      pc.setMousePos(xPos, yPos);
    }
  }

}
