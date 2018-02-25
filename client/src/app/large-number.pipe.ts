import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeNumber'
})
export class LargeNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (!value){
        return "";
      }
      let currency;
      if (!parseInt(value[0])){
        currency = value[0];
        value = value.substr(1);
      }
      let parts = value.split(",");
      let formatted = parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length-1)) + " " + ["אלף", "מיליון", "מיליארד"][parts.length-2]) : parts[0];
      return currency ? formatted + currency : formatted;
  }

}
