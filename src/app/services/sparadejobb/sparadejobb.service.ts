import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SparadejobbService {

  constructor(private httpClient: HttpClient) { }

  getSparadeJobb(paginationIndex, resultsPerPage) {
    return this.httpClient.get('./assets/sparadejobb.json');
  }

}
