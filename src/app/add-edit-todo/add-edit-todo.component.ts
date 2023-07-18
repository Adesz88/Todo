import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/models/Todo';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent {
  @Input() showAddEditModal: boolean = false;
  @Input() todo?: Todo;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  addEditOnClose(save: boolean) {
    this.showAddEditModal = false;
    this.onClose.emit(false);
  }
}
