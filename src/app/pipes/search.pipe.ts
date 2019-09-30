import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(records: any, args?: any): any {
    // return records.filter(record => record.fullname === 'Swarup');
    if (!records) { return null; }
    if (!args) { return records; }

    args = args.toLowerCase();

    return records.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
