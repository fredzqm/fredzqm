import { Injectable } from '@angular/core';
import {Technology, vendorImages} from "./home/technology";

@Injectable()
export class TechnologyService {

  constructor() {
  }

  public getAllTechnologies() : Technology[] {
    return vendorImages;
  }

  public getImageOf(name: string): string {
    for (const tech of vendorImages) {
      if (name === tech.name)
        return tech.href;
    }
    return null;
  }
}
