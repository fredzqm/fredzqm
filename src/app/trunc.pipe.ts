import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (value.length > 180)
      return value.substring(0, 180) + '...';
    else
      return value;
  }
}
