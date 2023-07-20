import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, numberAttribute } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { TodoService } from '../shared/services/todo.service';
import { Todo } from '../shared/models/Todo';
import { faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { Subscription, map, timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnChanges, OnInit, OnDestroy{
  @Input() filter: string = "all";

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  todos?: Todo[];
  currentTodo?: Todo = undefined;
  showAddEditModal: boolean = false;
  showSettingsModal: boolean = false;

  timerSubscription: Subscription = new Subscription;

  constructor(private categoryService: CategoryService, private todoService: TodoService) {
    let categories = categoryService.getAll();
    console.log(categories);
    //todoService.addBuiltIn();
    this.todos = todoService.getAll(this.filter);
    console.log(this.todos);
  }

  ngOnInit(): void {
    this.timerSubscription = timer(0, 60000).pipe(
      map(() => {
        this.todos = this.todoService.getAll(this.filter);
        console.log(new Date);
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.todos = this.todoService.getAll(this.filter);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  onTodoCheck(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.update(todo);
    this.todos = this.todoService.getAll(this.filter);
  }

  onSubtaskCheck(todo: Todo, index: number) {
    todo.subtasks[index].finished = !todo.subtasks[index].finished;
    this.todoService.update(todo);
    this.todos = this.todoService.getAll(this.filter);
  }

  onNew() {
    this.currentTodo = undefined;
    this.showAddEditModal = true;
  }

  onEdit(todo: Todo) {
    this.currentTodo = todo;
    this.showAddEditModal = true;
  }

  onDelete(id: number) {
    this.todoService.delete(id);
    this.todos = this.todoService.getAll(this.filter);
  }

  addEditOnClose(refresh: boolean) {
    this.showAddEditModal = false;
    this.todos = this.todoService.getAll(this.filter);
  }

  settingsOnClose(save: boolean) {
    this.showSettingsModal = false;
  }

  isExpired(todo: Todo) {
    const now = new Date();
    const todoDate = new Date(todo.date);

    if (todoDate.getFullYear() < now.getFullYear()) { return true; }
    if (todoDate.getFullYear() === now.getFullYear() && todoDate.getMonth() < now.getMonth()) { return true; }
    if (todoDate.getFullYear() === now.getFullYear() && todoDate.getMonth() === now.getMonth()
        && todoDate.getDay() < now.getDay()) { return true; }
    
    if (todoDate.getFullYear() === now.getFullYear() && todoDate.getMonth() === now.getMonth()
        && todoDate.getDay() === now.getDay() && todo.time) {

      const todoHours = Number(todo.time?.substring(0, 2));
      const todoMinutes = Number(todo.time?.substring(3, 5));
      if (todoHours < now.getHours()) { return true; }
      if (todoHours === now.getHours() && todoMinutes < now.getMinutes()) { return true; }
    }    

    return false;
  }
}
