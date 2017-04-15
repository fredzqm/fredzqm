import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PointCollection } from './pointCollection';

@Component({
  selector: 'app-hello',
  template: `
  <canvas #myCanvas class='chess-diag'
     [width]='width'
     [height]='height'></canvas>
  `
})
export class HelloComponent implements OnInit {
	canvasText = "Welcome to International Student Association!"
	width : number = 1000;
	height : number = 300;
	pointCollection : PointCollection;

	@ViewChild("myCanvas") canvas;

  constructor() { }

  ngOnInit() {
  	this.pointCollection = new PointCollection(this.canvasText, {
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
  	  this.pointCollection.setMousePos(e.pageX - native.offsetLeft, e.pageY - native.offsetTop);
  }

	bounceName() {
	    this.pointCollection.shake();
	    this.pointCollection.draw(this.canvas);
	    setTimeout(this.bounceName.bind(this), 30);
	}
	 
	bounceBubbles() {
	    this.pointCollection.update();
	    this.pointCollection.draw(this.canvas);
	    setTimeout(this.bounceBubbles.bind(this), 30);
	}
}