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
	width : number;
	height : number;
	pointCollection : PointCollection;

	@ViewChild("myCanvas") canvas;

  constructor() { }

  ngOnInit() {
  	this.pointCollection = createPointCollection(this.canvasText);
  	this.bounceBubbles();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(e: MouseEvent) {
    this.pointCollection.setMousePos(e.pageX - this.canvas.offset().left, e.pageY - this.canvas.offset().top);
  }

 
// function onMove(e) {
//     if (pointCollection) {
//         pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
//     }
// }
 
// function onTouchMove(e) {
//     if (pointCollection) {
//         pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
//     }
// }

 //  function initEventListeners() {
 //    // $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
 
 //    canvas.ontouchmove = function (e) {
 //        e.preventDefault();
 //        onTouchMove(e);
 //    };
 
 //    canvas.ontouchstart = function (e) {
 //        e.preventDefault();
 //    };
	// }

	get2DContext() : CanvasRenderingContext2D {
		return this.canvas.nativeElement.getContext("2d");
	}

	bounceName() {
	    this.pointCollection.shake();
	    this.pointCollection.draw(this.get2DContext());
	    // setTimeout(this.bounceName, 30);
	}
	 
	bounceBubbles() {
	    this.pointCollection.update();
	    this.pointCollection.draw(this.get2DContext());
	    // setTimeout(this.bounceBubbles, 30);
	}
}