import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Job, Kommun, ErbjudenArbetsplats, Anstallningstyp, Yrkesroll } from '../../types/job.type';

@Injectable()
export class SearchJobsCommonVariablesService {
  private showAdViewSource = new BehaviorSubject<boolean>(false);
  showAdView = this.showAdViewSource.asObservable();

  private kommun: Kommun = {
    id: 0,
    namn: ''
  }

  private erbjudenArbetsplats: ErbjudenArbetsplats = {
    kommun: this.kommun
  };

  private anstallningstyp: Anstallningstyp = {
      id: 0,
      namn: ''
  }

  private yrkesroll: Yrkesroll = {
      id: 0,
      namn: ''
  }

  private job: Job = {
    id: 0,
    arbetsgivarenamn: '',
    rubrik: '',
    postadressArbetsplatsNamn: '',
    korkortList: [],
    yrkeErfarenhet: [],
    erbjudenArbetsplats: this.erbjudenArbetsplats,
    publiceringsdatum: 0,
    sistaAnsokningsdatum: 0,
    sistaPubliceringsdatum: 0,
    anstallningstyp: this.anstallningstyp,
    lonetyp: '',
    lonebeskrivning: '',
    antalPlatser: 0,
    organisationsnummer: 0,
    sokt: false,
    annonstext: '',
    yrkesroll: this.yrkesroll,
    ingenYrkeserfarenhetKravs: false,
    egenbil: false,
    referens: '',
    tilltrade: 0,
    ansokningssattPost: '',
    ansokningssattEpost: '',
    ansokningssattWebbadress: '',
    ansokningssattAnnat: '',
    ansokningssattViaAf: false,
    ovrigtOmAnsokan: '',
    postadressUtdelningsadress: '',
    postadressPostnummer: '',
    postadressPostort: '',
    postadressLand: '',
    besoksadressGatuadress: '',
    besoksadressOrt: '',
    telefonnummer: '',
    epost: '',
    webbplats: '',
    villkorsbeskrivning: '',
    kontaktpersoner: []
  }

  private currentJobSource = new BehaviorSubject<Job>(this.job);
  currentJob = this.currentJobSource.asObservable();

  constructor() {
    // this.setShowAdView(false);
  }

  setShowAdView(value: boolean) {
    this.showAdViewSource.next(value);
  }
  setCurrentJob(job: Job) {
    this.currentJobSource.next(job);
  }
}
