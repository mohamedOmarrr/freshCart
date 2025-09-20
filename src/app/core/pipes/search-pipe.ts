import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items:any[], searchTerm:string): any[] {
    if(!items) return []

    if(!searchTerm) return items;

    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
