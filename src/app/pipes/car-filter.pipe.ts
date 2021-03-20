import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car-detail';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.
    filter((c:CarDetail)=>`${c.brandName} ${c.description} ${c.modelYear}`.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
