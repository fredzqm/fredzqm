import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PointCollection, createPointCollection } from './pointCollection';

@Component({
  selector: 'app-hello',
  template: `
  <canvas #myCanvas class='chess-diag'
     [attr.width]='width'
     [attr.height]='height'></canvas>
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
  	this.pointCollection = createPointCollection(this.canvasText);
  	console.log(this.pointCollection);
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