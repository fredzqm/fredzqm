import { Component, OnInit } from '@angular/core';
import { StoneCutter } from './reactComponent';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TechnologyService } from '../technology.service';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  constructor(private technologyService: TechnologyService) {

  }

  ngOnInit() {
    ReactDOM.render(
      React.createElement(StoneCutter, {
        technologies: this.technologyService.getAllTechnologies()
      }),
      document.getElementById('stonecutter')
    );
  }
}
