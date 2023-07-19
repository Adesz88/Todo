import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../shared/models/Todo';
import { FormControl } from '@angular/forms';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent implements OnChanges{
  @Input() showAddEditModal: boolean = false;
  @Input() todo?: Todo;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  title = new FormControl("");
  date = new FormControl("");
  checkbox = new FormControl("");
  time = new FormControl({value: "", disabled: true});
  details = new FormControl("");

  disableTimeInput: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // set values on open
    if (this.showAddEditModal && this.todo !== undefined) {
      this.title.setValue(this.todo.title);
      //console.log(new Date(this.todo.date).toLocaleDateString());
      console.log(this.todo.date);
      console.log({date: new Date("2023-07-18T18:14:50.941Z")});
      if (this.todo.time !== undefined) {
        this.time.setValue(this.todo.time);
        this.time.enable();
        this.checkbox.setValue("checked");
      }
      console.log(this.todo.time);
      this.details.setValue(this.todo.details);

    } else if (this.todo === undefined) {
      // clear form
      this.title.setValue("");
      this.date.setValue("");
      this.checkbox.setValue("");
      this.time.disable();
      this.time.setValue("");
      this.details.setValue("");
    }
  }

  addEditOnClose(save: boolean) {
    if (save) {
      console.log(this.title.value);
      console.log(this.date.value);
      console.log(this.time.value);
      let title = this.title.value;
      let date = this.date.value;
      let details = this.details.value;
      if (title && date && details) {
        this.todoService.add(title, date, details);
      }
      
    }

    this.showAddEditModal = false;
    this.onClose.emit(false);
  }

  onCheckClick() {
    this.time.disabled ? this.time.enable() : this.time.disable();
  }
}
