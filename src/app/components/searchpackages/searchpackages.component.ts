import { Component, OnInit } from '@angular/core';
import { SearchPackage } from '../../models/SearchPackage';
import { UtilService } from '../../services/util/util.service';
import { Profilkriterium } from '../../models/Profilkriterium';

@Component({
  selector: 'app-searchpackages',
  templateUrl: './searchpackages.component.html',
  styleUrls: ['./searchpackages.component.scss'],
  providers: [ UtilService ],
})
export class SearchpackagesComponent implements OnInit {
  searchPacks: Array<SearchPackage>;
  heroPackage: SearchPackage;
  heroCompanionPackages: Array<SearchPackage>;
  foldoutPackages: Array<SearchPackage>;

  constructor(private utilService: UtilService) {}

  ngOnInit() {
    this.searchPacks = this.getJsonData();
    this.searchPacks.forEach((searchpackage) => {
      searchpackage.searchUrl = this.utilService.getUrlForCriteria(searchpackage.kriterier);
    });
    this.heroPackage = this.getHeroPackage();
    this.heroCompanionPackages = this.getHeroCompanionPackages();
    this.foldoutPackages = this.getFoldoutPackages();
  }

  getHeroPackage(): SearchPackage {
    return this.searchPacks[0];
  }

  getHeroCompanionPackages(): Array<SearchPackage> {
    return this.searchPacks.slice(1, 3);
  }

  getFoldoutPackages(): Array<SearchPackage> {
    return this.searchPacks.slice(3, this.searchPacks.length - 1);
  }

  getSearchUrl(kriterier) {
    console.log(kriterier);
    return this.utilService.getUrlForCriteria(kriterier);
  }

  getJsonData(): Array<SearchPackage> {
    return [
      new SearchPackage(
        'Sjukvård',
        './assets/img/halso_sjukvard.jpg',
        'Sjuk och hälsovård för dig som gillar fysiskt arbete som inte kräver lång erfarenhet.',
        [
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
          new Profilkriterium('2227', 'Geriatriksjuksköterskor', 'yrkesgrupper')
        ]),
      new SearchPackage(
          'Restaurang',
          './assets/img/restaurang_och_cafe.jpg',
          'Restaurang och sådant som handlar om att laga mat med händerna. För sig som vill vara som Ernst men inte vill vara på teve. Varning för vassa föremål.',
          [
            new Profilkriterium('5132', 'Bartendrar', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('5131', 'Hovmästare och servitörer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9413', 'Kafé- och konditoribiträden', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('5120', 'Kockar och kallskänkor', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('3451', 'Köksmästare och souschefer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9411', 'Pizzabagare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9412', 'Restaurang- och köksbiträden m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('1720', 'Restaurang- och kökschefer', 'YRKESGRUPP_ROLL'),
          ]
        ),
        new SearchPackage(
          'Byggbranchen',
          './assets/img/byggbranchen.jpg',
          'Byggbranchen söker dig med gymnasieutbildning. Du kan behöva tycka om höjder och blå tummar.',
          [
            new Profilkriterium('7114', 'Anläggningsarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('8342', 'Anläggningsmaskinförare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7113', 'Betongarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7213', 'Byggnads- och ventilationsplåtslagare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9310', 'Grovarbetare inom bygg och anläggning', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7112', 'Murare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7131', 'Målare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7116', 'Ställningsbyggare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7121', 'Takmontörer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7111', 'Träarbetare, snickare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7125', 'VVS-montörer m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7119', 'Övriga byggnads- och anläggningsarbetare', 'YRKESGRUPP_ROLL'),
          ]
        ),
        new SearchPackage(
          'Ej gymnasieutbildad',
          './assets/img/ej_gymnasieutbildning.jpg',
          'Jobb som inte kräver gymnasieutbildning',
          [
            new Profilkriterium('9111', 'Städare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9119', 'Övrig hemservicepersonal m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9120', 'Bilrekonditionerare, fönsterputsare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9210', 'Bärplockare och plantörer m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9310', 'Grovarbetare inom bygg och anläggning', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9320', 'Handpaketerare och andra fabriksarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9331', 'Hamnarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9332', 'Ramppersonal, flyttkarlar o varupåfyllare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9411', 'Pizzabagare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9412', 'Restaurang- och köksbiträden m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9413', 'Kafé- och konditoribiträden', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9520', 'Torg- och marknadsförsäljare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9610', 'Renhållnings- och återvinningsarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9621', 'Reklamutdelare och tidningsdistributörer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9622', 'Vaktmästare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9629', 'Övriga servicearbetare', 'YRKESGRUPP_ROLL'),
          ]
        ),
        new SearchPackage(
          'Fysiskt arbete med begränsad erfarenhet',
          './assets/img/fysiskt_ej_lang_erfarenhet.jpg',
          'För dig som gillar fysiskt arbete som inte kräver lång erfarenhet',
          [
            new Profilkriterium('4322', 'Lager- och terminalpersonal', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('9310', 'Grovarbetare inom bygg och anläggning', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7134', 'Saneringsarbetare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('8344', 'Truckförare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('7114', 'Anläggningsarbetare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('2199', 'God fysik (tunga lyft)', 'KOMPETENS'),
          ]),
        new SearchPackage(
          'Pedagogiskt arbete',
          './assets/img/pedagogik.jpg',
          'Pedagogiskt arbete med barn å sånt.',
          [
            new Profilkriterium('5312', 'Elevassistenter m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('2342', 'Fritidspedagoger', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('3422', 'Idrottstränare och instruktörer m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('3449', 'Övriga utbildare och instruktörer', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('3423', 'Fritidsledare m.fl.', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('5311', 'Barnskötare', 'YRKESGRUPP_ROLL'),
            new Profilkriterium('2199', 'God fysik (tunga lyft)', 'KOMPETENS'),
            new Profilkriterium('603705', 'Barntillsyn, erfarenhet', 'KOMPETENS'),
            new Profilkriterium('567', 'Barn med särskilda behov', 'KOMPETENS'),
          ]
        ),
        new SearchPackage(
          'Utlandsjobb',
          './assets/img/utlandsjobb.jpg',
          'Jobb för dig som längtar utomlands, för vem gör inte det?',
          [
            new Profilkriterium('3', 'Arbete utomlands', 'ANSTALLNINGSTYP'),
          ]
        ),
        new SearchPackage(
          'Administatör/Assistent',
          './assets/img/admin_assistent_service',
          'Är du en fena på Office-paketet? Här är jobben för dig',
          [
            new Profilkriterium('608378', 'MS Word', 'KOMPETENS'),
            new Profilkriterium('608767', 'MS Office', 'KOMPETENS'),
            new Profilkriterium('608375', 'MS Excel', 'KOMPETENS'),
          ]
        )
    ];
  }

}
