import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { PointCollection } from './pointCollection';

@Component({
  selector: 'app-hello',
  template: `
  <canvas #myCanvas class='chess-diag' [height]='height' [width]='width'></canvas>
  `,
  styles:[`
  	:host canvas {
  		width: 100%;
  		height: 100%;
  	}
  `]
})
export class HelloComponent implements OnInit {
	canvasText = "Hello, I am Fred Zhang!"
	pointCollection : PointCollection;
  height : number = 200;
  width : number = 2000;

	@ViewChild("myCanvas") canvas;

  constructor() { }

  ngOnInit() {
    let horizonBorderPercentage = 2/(this.canvasText.length+4);
  	this.pointCollection = new PointCollection(this.canvasText, 
    {
      left: this.width * horizonBorderPercentage ,
      right: this.width * (1-horizonBorderPercentage),
      top: this.height * 0.2,
      buttom: this.height * 0.8
    } ,
    {
	  	friction : 0.85,
	  	rotationForce : 0.03,
	    springStrength : 0.1
		});
  	this.bounceBubbles();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(e: MouseEvent) {
  	let native = this.canvas.nativeElement;
  	if (this.pointCollection)
  	  this.pointCollection.setMousePos(
  	  	(e.pageX - native.offsetLeft) / native.offsetWidth *  this.width, 
  	  	(e.pageY - native.offsetTop)  / native.offsetHeight * this.height);
  }

  getContext() : CanvasRenderingContext2D {
    let ctx = this.canvas.nativeElement.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
    return ctx;
  }

	bounceName() {
	    this.pointCollection.shake();
	    this.pointCollection.draw(this.getContext());
	    setTimeout(this.bounceName.bind(this), 30);
	}
	 
	bounceBubbles() {
	    this.pointCollection.update();
	    this.pointCollection.draw(this.getContext());
	    setTimeout(this.bounceBubbles.bind(this), 30);
	}
}