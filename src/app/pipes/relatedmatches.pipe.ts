import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'RelatedmatchesPipe'
})
export class RelatedmatchesPipe implements PipeTransform {

  transform(value: any[], param?): any {
    if (param === 'yrke') {
      const items = this.sortItems(value).reverse();
      return items.filter(kriterium => {
        return kriterium.matchningskriterium.typ === 'YRKESROLL';
      });
    } else {
      return value;
    }
  }

  private sortItems(items) {
    return items.sort(function(a, b) {
      return parseFloat(a.antal) - parseFloat(b.antal);
    });
  }
}
