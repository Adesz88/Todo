import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../shared/models/Todo';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../shared/services/todo.service';
import { faCirclePlus, faL } from '@fortawesome/free-solid-svg-icons';
import { Subtask } from '../shared/models/Subtask';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/Category';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.scss']
})
export class AddEditTodoComponent implements OnInit, OnChanges{
  @Input() showAddEditModal: boolean = false;
  @Input() todo?: Todo;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  title = new FormControl("");
  date = new FormControl("");
  checkbox = new FormControl("");
  time = new FormControl({value: "", disabled: true});
  details = new FormControl("");
  categorySelect = new FormControl([""]);
  subtasks: FormArray<FormControl> = new FormArray([new FormControl("")]);

  categories: Category[] = [];
  disableTimeInput: boolean = false;
  missingFields: boolean = false;
  faCirclePlus = faCirclePlus;

  constructor(private todoService: TodoService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // set values on open
    if (this.showAddEditModal && this.todo !== undefined) {
      this.title.setValue(this.todo.title);
      let dateStr = this.todo.date.toString().substring(0, 10);
      this.date.setValue(dateStr);
      if (this.todo.time !== undefined) {
        this.time.setValue(this.todo.time);
        this.time.enable();
        this.checkbox.setValue("checked");
      }
      this.details.setValue(this.todo.details);
      if (this.todo.subtasks.length > 0) {
        this.subtasks.controls[0].setValue(this.todo.subtasks[0].name);

        for (let i = 1; i < this.todo.subtasks.length; i++) {
          this.subtasks.push(new FormControl(this.todo.subtasks[i].name));
        }
      }

      this.categorySelect.setValue([]);
      for (let cat of this.todo.categories) {
        this.categorySelect.value?.push(cat.name);
      }

    } else if (this.todo === undefined) {
      // clear form
      this.title.setValue("");
      this.date.setValue("");
      let currentDate = new Date;
      this.date.setValue(currentDate.toISOString().substring(0, 10));
      this.checkbox.setValue("");
      this.time.disable();
      this.time.setValue("");
      this.details.setValue("");
      this.categorySelect.setValue([]);
    }
  }

  addEditOnClose(save: boolean) {
    if (save) {
      console.log(this.categorySelect.value?.length);
      console.log(this.title.value);
      console.log(this.date.value);
      console.log(this.time.value);
      let title = this.title.value;
      let date = this.date.value;
      let time = this.time.value;
      let details = this.details.value;
      let selectedCategories = this.categorySelect.value;
      console.log(selectedCategories);

      // check required fields
      if (title && date && selectedCategories && selectedCategories.length) {
        // save subtasks that not empty
        let subtasksToSave: Subtask[] = [];
        for (let control of this.subtasks.controls) {
          if (control.value !== "") {
            subtasksToSave.push({name: control.value, finished:false});
          }
        }

        let categoriesToSave: Category[] = [];
        for (let selectedCategory of selectedCategories){
          categoriesToSave.push(this.categoryService.get(selectedCategory));
        }

        let newTodo: Todo = {
          id: 0,
          title: title,
          date: new Date(date),
          subtasks: subtasksToSave,
          details: details === null ? "" : details,
          categories: categoriesToSave
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

        this.closeModal();
      } else {
        this.missingFields = true;
      }
    } else {
      this.closeModal();
    }    
  }

  closeModal() {
    this.subtasks = new FormArray([new FormControl("")]);
    this.showAddEditModal = false;
    this.missingFields = false;
    this.onClose.emit(false);
  }

  onCheckClick() {
    this.time.disabled ? this.time.enable() : this.time.disable();
  }

  onNewSubtask() {
    this.subtasks.push(new FormControl(""));
  }
}
