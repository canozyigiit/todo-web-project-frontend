import { Todo } from './../models/todo';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(value: Todo[], filterText: string): Todo[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((t:Todo)=>`${t.Description}`.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
