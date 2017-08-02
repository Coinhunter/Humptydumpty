import { Injectable } from '@angular/core';

@Injectable()
export class ResultContainerMapService {
  map: Object; 

  constructor() { 
    this.map = {};
  }

  hasResultForIndex(index: number) {
    const stringProperty:string = index.toString();
    return this.map.hasOwnProperty(stringProperty);
  }

  addResultForIndex(index: number, result: Array<Object>) {
    if (this.hasResultForIndex(index)) {
      throw new Error('Result already loaded for index ' + index);
    } else {
      this.map[index.toString()] = result;
    }
  }

  getResultForIndex(index: number) {
    if (this.hasResultForIndex(index)) {
      return this.map[index.toString()];
    } else {
      throw new Error('No result stored for index ' + index);
    }
  }

  clean() {
    this.map = {};
  }
}