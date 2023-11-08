import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'customFilter'
})
export class FilterPipe implements PipeTransform {

  transform(data: Product[], value: string): any[] {
    if (!data || !value) return data;

    const result = data.filter(p => {
      if (p.description.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === -1 || p.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === -1) {
        return;
      }
      return p;
    });

    return result;
  }

}
