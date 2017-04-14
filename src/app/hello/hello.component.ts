import { Component, OnInit } from '@angular/core';

declare function bubble(str: string) : void;


@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
	canvasText = "Welcome to International Student Association!"

  constructor() { }

  ngOnInit() {
    // slider();
    bubble(this.canvasText);
  }
}