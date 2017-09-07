import {Pipe, PipeTransform} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'JoblistPipe'
})
export class JoblistPipe implements PipeTransform {

  transform(value: any[], param?): any {
    if (param === 'toApplyFor') {
      return value.filter(job => {
        return !job.sokt;
      });
    } else if (param === 'applied') {
      return value.filter(job => {
        return job.sokt;
      });
    } else if (param === 'expired') {
      return value.filter(job => {
        return new Date(new Date(job.sistaAnsokningsdatum )) < new Date(new Date().toDateString());
      });
    } else {
      return value;
    }
  }
}
