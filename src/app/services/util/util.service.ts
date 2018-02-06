import { Injectable } from '@angular/core';
import { Profilkriterium } from '../../models/Profilkriterium';
import { GlobalVariables } from '../../global';

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

  getUrlForCriteria(profilkriterier: Array<Profilkriterium>):string {
    // Sort the kriterium according to type
    profilkriterier.sort(function(a, b) {
      var nameA = a.typ.toUpperCase(); // ignore upper and lowercase
      var nameB = b.typ.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    let url = '';
    let currenttype = undefined;
    profilkriterier.forEach(profilkriterie => {
      if (profilkriterie.typ !== currenttype) {
        // New category.
        currenttype = profilkriterie.typ;

        // Look at the current last sign and if it's a semicolon - remove it.
        if (url !== '' && url[url.length - 1] === ';') {
          url = url.slice(0, url.length - 1);
        }

        // Append &TYPE= to it.
        url += ('&' + profilkriterie.typ + '=');
      }
      // Add the value of the kriterie with a semicolon.
      url += (profilkriterie.varde + ';');
    });

    // Finally, replace the first '&' with a '?'
    // It will always be the first character in the url string.
    // then remove the last semicolon.
    url = url.slice(1, url.length - 1);
    url = '?' + url;

    url = url.toUpperCase();

    // I url-parsern används yrkesroll istället för yrke.
    url = url.replace(/yrke/i, 'YRKESROLL');


    return GlobalVariables.PLATSBANKEN_URL + url;
  }
  

}
