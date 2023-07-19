import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../shared/models/Todo';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../shared/services/todo.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Subtask } from '../shared/models/Subtask';
import { CategoryService } from '../shared/services/category.service';

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
  subtasks: FormArray<FormControl> = new FormArray([new FormControl("")]);

  disableTimeInput: boolean = false;

  faCirclePlus = faCirclePlus;

  constructor(private todoService: TodoService, private categoryService: CategoryService) { }

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
      if (this.todo.subtasks.length > 0) {
        this.subtasks.controls[0].setValue(this.todo.subtasks[0].name);

        for (let i = 1; i < this.todo.subtasks.length; i++) {
          this.subtasks.push(new FormControl(this.todo.subtasks[i].name));
        }
      }

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
      let time = this.time.value;
      let details = this.details.value;
      let subtasksToSave: Subtask[] = [];

      for (let control of this.subtasks.controls) {
        subtasksToSave.push({name: control.value, finished:false});
      }
      console.log(subtasksToSave);

      if (title && date && details) {
        let newTodo: Todo = {
          id: 0,
          title: title,
          date: new Date(date),
          subtasks: subtasksToSave,
          details: details,
          categories: [this.categoryService.getAll()[0]]
        };

        if (time) {
          newTodo.time = time;
        }

        if (this.todo !== undefined) {
          newTodo.id = this.todo.id;
          this.todoService.update(newTodo);
          console.log(newTodo);
        } else {
          this.todoService.add(newTodo);
        }
      }
    }

    this.subtasks = new FormArray([new FormControl("")]);
    this.showAddEditModal = false;
    this.onClose.emit(false);
  }

  onCheckClick() {
    this.time.disabled ? this.time.enable() : this.time.disable();
  }

  onNewSubtask() {
    this.subtasks.push(new FormControl(""));
  }
}
