import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class SmsTemplateTextPipe implements PipeTransform {

  transform(content: string, characterLimit: number): string {
    if (content.length <= characterLimit) {
      return content;
    } else {
      return `${content.substring(0, characterLimit)}...`;
    }
  }

}