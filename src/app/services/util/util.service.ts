import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }
  
  formatNumberOfJobs(numberOfJobs) {
    let numberOfJobsCopy = numberOfJobs;
    let builtString = "";
    while (numberOfJobsCopy.length > 0) {
        builtString = numberOfJobsCopy.slice(-3) + " " + builtString;
        numberOfJobsCopy = (numberOfJobsCopy.slice(0, numberOfJobsCopy.length - 3));      
    }
    builtString = builtString.trim();
    return builtString;    
  }

}
