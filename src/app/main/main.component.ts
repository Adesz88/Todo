import { Component, numberAttribute } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { TodoService } from '../shared/services/todo.service';
import { Todo } from '../shared/models/Todo';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  todos?: Todo[];
  currentTodo?: Todo = undefined;
  showAddEditModal: boolean = false;
  showSettingsModal: boolean = false;

  constructor(private categoryService: CategoryService, private todoService: TodoService) {
    let categories = categoryService.getAll();
    console.log(categories);
    //todoService.addBuiltIn();
    this.todos = todoService.getAll();
    console.log(this.todos);
  }

  onTodoCheck(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.update(todo);
    this.todos = this.todoService.getAll();
  }

  onSubtaskCheck(todo: Todo, index: number) {
    todo.subtasks[index].finished = !todo.subtasks[index].finished;
    this.todoService.update(todo);
    this.todos = this.todoService.getAll();
  }

  onNew() {
    this.currentTodo = undefined;
    this.showAddEditModal = true;
  }

  onEdit(todo: Todo) {
    console.log("edit" + todo.id);
    this.currentTodo = todo;
    this.showAddEditModal = true;
  }

  onDelete(id: number) {
    console.log("delete" + id);
    this.todoService.delete(id);
    this.todos = this.todoService.getAll();
  }

  addEditOnClose(refresh: boolean) {
    this.showAddEditModal = false;
    this.todos = this.todoService.getAll();
  }

  settingsOnClose(save: boolean) {
    this.showSettingsModal = false;
  }
}
