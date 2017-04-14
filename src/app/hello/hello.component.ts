import { Component, OnInit } from '@angular/core';

declare function bubble(str: string) : void;


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

	@ViewChild("myCanvas") myCanvas;

  constructor() { }

  ngOnInit() {
    bubble(this.canvasText);
  }
}