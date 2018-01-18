import { Injectable } from '@angular/core';
import { Profilkriterium } from '../../models/Profilkriterium';

@Injectable()
export class UrlparserService {

  constructor() { }

  baseUrl = 'https://www.arbetsformedlingen.se/Tjanster/Arbetssokande/Platsbanken/';

  public getUrlForCriteria(profilkriterier: Array<Profilkriterium>):string {
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

    return this.baseUrl + url;
  }

}
