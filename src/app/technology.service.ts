import { Injectable } from '@angular/core';
import {Technology, vendorImages} from "./home/technology";

@Injectable()
export class TechnologyService {

  constructor() {
  }

  public getAllTechnologies() : Technology[] {
    return vendorImages;
  }

  public getTechnologyByName(name: string): Technology {
    for (const tech of vendorImages) {
      if (name === tech.name)
        return tech;
    }
    throw "Technology " + name + " cannot be found";
  }
}
