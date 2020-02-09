import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunk'
})
export class TrunkPipe implements PipeTransform {
  transform(inputText: string, maxLength?: number): any {
    const maxStringLength = maxLength ? maxLength : 40;
    return inputText.length > maxStringLength
      ? `${inputText.substr(0, maxStringLength)}...`
      : inputText;
  }
}
