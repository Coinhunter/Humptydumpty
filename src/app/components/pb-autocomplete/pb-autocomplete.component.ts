import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PbapiKriterierService } from '../../services/pbapi-kriterier/pbapi-kriterier.service';
import { SelectedCriteriaService } from 'app/services/selected-criteria/selected-criteria.service';

import { Profilkriterium } from 'app/models/Profilkriterium';

@Component({
  selector: 'pb-autocomplete',
  templateUrl: './pb-autocomplete.component.html',
  styleUrls: ['./pb-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PbAutocompleteComponent implements OnInit {
  @Input() suggestionsType: string;
  @Input() allowFritext?: string = 'false';
  @Input() placeholder?: string = 'Sök...'

  public fritextType = 'fritext';

  inputInFocus = false;

  showCriteria = false;
  val: Profilkriterium;
  suggestions: Array<Profilkriterium>;
  chosen: Array<Profilkriterium> = [];
  timeout: any;
  blurTimeout: any;
  inputValue: string;
  loadingResults: boolean;
  addingValueInProgress = false;

  constructor(private pbKriterier: PbapiKriterierService,
    private selectedKriterier: SelectedCriteriaService) {

  }

  ngOnInit() {
    this.suggestions = [];
  }

  search(event) {
    this.suggestions = new Array();

    const results = [];
    this.inputValue = event.query;
    if (this.allowFritext === 'true') {
      this.suggestions.push(new Profilkriterium(event.query, event.query, this.fritextType));
    }
    this.pbKriterier.getKriterierByType(this.suggestionsType, event.query).subscribe((data) => {
      data.matchningskriteriumList.slice(0, 12).forEach(kriterium => {
        results.push(kriterium);
          // this.results = [kriterium].concat([...this.results]);
      });
      this.suggestions = this.suggestions.slice(0, 1).concat(results)
    })
  }
  focus(event) {
    this.inputInFocus = true;
  }
  blur(event) {
    console.log(event)
    if (event.relatedTarget && event.relatedTarget.classList.contains('selected-criteria-btn')) {
        this.focusInput();
    } else {
      this.inputInFocus = false;
    }
  }
  addValue(value) {
    this.pushChoosenValue(value);
    this.val = undefined;
    this.focusInput();
  }
  removeFromChosen(profilkriterium) {
    console.log('Removing: ', profilkriterium)
    const index = this.chosen.indexOf(profilkriterium);
    if (index > -1) {
      this.chosen.splice(index, 1);
    }
  }
  pushChoosenValue(value) {
    // Avoid adding the same thing multiple times.
    const found = this.chosen.find((profilkriterium) => {
      return this.allowFritext && !value.id ? false : profilkriterium.varde === value.id ;
    });

    if (!found) {
      this.chosen.push(new Profilkriterium(value.id, value.namn, value.typ));
    }

    // Update service values.
    this.selectedKriterier.setSelectedYrkesKriterier(this.chosen);
  }
  focusInput() {
    this.val = undefined;
    this.showCriteria = true;
    this.inputInFocus = true;
  }
  boldify(input: string, bold: string): string {
    const matchIndex = input.toLowerCase().indexOf(bold.toLowerCase());
    const beforeMatchingWord = input.slice(0, matchIndex);
    const matchingWord = input.slice(matchIndex, matchIndex + bold.length);
    const afterMatchingWord = input.slice(matchIndex + bold.length, input.length);
    return [beforeMatchingWord, '<b>', matchingWord, '</b>', afterMatchingWord].join('');
  }

}
