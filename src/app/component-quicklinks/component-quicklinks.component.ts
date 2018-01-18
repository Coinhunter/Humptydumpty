import { Component, OnInit } from '@angular/core';
import { Profilkriterium } from '../models/Profilkriterium';

@Component({
  selector: 'app-component-quicklinks',
  templateUrl: './component-quicklinks.component.html',
  styleUrls: ['./component-quicklinks.component.scss']
})
export class ComponentQuicklinksComponent implements OnInit {

  baseUrl = 'https://www.arbetsformedlingen.se/Tjanster/Arbetssokande/Platsbanken/';

  quicklinks = [
    {
      headline: 'Populära jobbplaceringar',
      items: [
        {
          name: 'Göteborg',
          url: this.getUrlForCriteria([new Profilkriterium('1480', 'Göteborg', 'KOMMUN')]),
        },
        {
          name: 'Stockholm',
          url: this.getUrlForCriteria([new Profilkriterium('0180', 'Stockholm', 'KOMMUN')]),
        },
        {
          name: 'Malmö',
          url: this.getUrlForCriteria([new Profilkriterium('1280', 'Malmö', 'KOMMUN')]),
        },
        /*
        {
          name: 'Hela Sverige',
          url: this.getUrlForCriteria([new Profilkriterium('0180', 'Sverige', 'LAND')]),
          hardcoded: "/?LAND=1"
        },
        */
      ]
    },
    {
      headline: 'Populära yrken',
      items: [
        {
          name: 'Hotell & Restaurang',
          url: this.getUrlForCriteria([
            new Profilkriterium('5132', 'Bartendrar', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('5131', 'Hovmästare och servitörer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9413', 'Kafé- och konditoribiträden', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('5120', 'Kockar och kallskänkor', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('3451', 'Köksmästare och souschefer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9411', 'Pizzabagare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9412', 'Restaurang- och köksbiträden m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('1720', 'Restaurang- och kökschefer', 'YRKESGRUPP_ROLL'),            
          ]),
        },
        {
          name: 'Administration',
          url: '',
        },
        {
          name: 'Hälsa och Sjukvård',
          url: this.getUrlForCriteria([
            new Profilkriterium('5326', 'Ambulanssjukvårdare', 'yrkesgrupper'),
            new Profilkriterium('5325', 'Barnsköterskor', 'yrkesgrupper'),
            new Profilkriterium('5341', 'Skötare', 'yrkesgrupper'),
            new Profilkriterium('5321', 'Undersköterskor, hemtjänst, äldreboende m.fl.', 'yrkesgrupper'),
            new Profilkriterium('5323', 'Undersköterskor, vård- o specialavd o mottagning', 'yrkesgrupper'),
            new Profilkriterium('5330', 'Vårdbiträden', 'yrkesgrupper'),
            new Profilkriterium('5349', 'Övrig vård- och omsorgspersonal', 'yrkesgrupper'),
            new Profilkriterium('5311', 'Barnskötare', 'yrkesgrupper'),
            new Profilkriterium('2273', 'Arbetsterapeuter', 'yrkesgrupper'),
            new Profilkriterium('2213', 'AT-läkare', 'yrkesgrupper'),
            new Profilkriterium('2222', 'Barnmorskor', 'yrkesgrupper'),
            new Profilkriterium('2232', 'Barnsjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2224', 'Distriktssköterskor', 'yrkesgrupper'),
            new Profilkriterium('2272', 'Fysioterapeuter och sjukgymnaster', 'yrkesgrupper'),
            new Profilkriterium('2221', 'Grundutbildade sjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2228', 'Intensivvårdssjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2231', 'Operationssjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2225', 'Psykiatrisjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2241', 'Psykologer', 'yrkesgrupper'),
            new Profilkriterium('2242', 'Psykoterapeuter', 'yrkesgrupper'),
            new Profilkriterium('2235', 'Röntgensjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2233', 'Skolsköterskor', 'yrkesgrupper'),
            new Profilkriterium('2211', 'Specialistläkare', 'yrkesgrupper'),
            new Profilkriterium('2212', 'ST-läkare', 'yrkesgrupper'),
            new Profilkriterium('2239', 'Övriga specialistsjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2219', 'Övriga läkare', 'yrkesgrupper'),
            new Profilkriterium('2289', 'Övriga specialister inom hälso- och sjukvård', 'yrkesgrupper'),
            new Profilkriterium('3212', 'Biomedicinska analytiker m.fl.', 'yrkesgrupper'),
            new Profilkriterium('2223', 'Anestesisjuksköterskor', 'yrkesgrupper'),
            new Profilkriterium('2226', 'Ambulanssjuksköterskor m.fl.', 'yrkesgrupper'),
            new Profilkriterium('2227', 'Geriatriksjuksköterskor', 'yrkesgrupper'),
          ]),
        },
        {
          name: 'Data och IT',
          url: '',
        },                        
      ]
    }
  ];

  constructor() { }

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

    return this.baseUrl + url;
  }

  ngOnInit() {
  }

}
