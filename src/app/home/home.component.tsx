import {Component, OnInit} from '@angular/core';
import {StoneCutter} from './reactComponent';
import * as React from "react";
import * as ReactDOM from "react-dom";

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit {
  ngOnInit() {
    ReactDOM.render(
      <StoneCutter></StoneCutter>,
      document.getElementById("stonecutter")
    );
  }
}
