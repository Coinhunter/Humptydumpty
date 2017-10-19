import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariables } from '../../global';
import { Observable } from 'rxjs';

@Injectable()
export class FreetextSearchService {

  private pbApi = GlobalVariables.PBAPI_URL;
  constructor(private http: Http) {
  }

  getMatchingJobAreas (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=YRKESOMRADEN&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }
  getMatchingJobGroups (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=YRKESGRUPPER&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }
  getMatchingJobs (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=YRKEN&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getMatchingCountries (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=LANDER&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getMatchingCounties (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=LAN&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getMatchingMuncipalities (freetext: string) {
    const url = `${this.pbApi}/matchning/matchningskriterier?typer=KOMMUNER&namnfilter=` + freetext;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  private extractData(response: Response) {
    // If request fails, throw an Error that will be caught
    if (response.status < 200 || response.status >= 300) {
      console.log(response);
      throw new Error('This request has failed ' + response.status);
    } else { // If everything went fine, return the response
      return JSON.parse(response.text());
    }
  }
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
