import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { CategoryService } from './category.service';
import { Subtask } from '../models/Subtask';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly BUILT_IN_TODOS: Todo[] = [
    {
      id: 1689678890941,
      title: "Coffee with Olivia",
      date: new Date("2023-07-18T18:14:50.941Z"),
      details: "Cafe Frei at Balaton st.",
      time: "21:30",
      subtasks: [],
      categories: [
        {
          name: "Personal",
          color: "warning"
        }
      ]
    },
    {
      id: 1689678903073,
      title: "Buy ingredients for spaghetti bolognese",
      date: new Date("2023-07-15T11:24:50.941Z"),
      details: "",
      subtasks: [
        {
          name: "Ground beef",
          finished: false
        },
        {
          name: "Tomato sauce",
          finished: true
        },
        {
          name: "Parmesan cheese",
          finished: false
        }
      ],
      categories: [
        {
          name: "Personal",
          color: "warning"
        }
      ]
    },
    {
      id: 1689678910523,
      title: "Plant the flowers",
      date: new Date("2023-07-12T16:40:50.941Z"),
      details: "",
      subtasks: [],
      categories: [
        {
          name: "Personal",
          color: "warning"
        }
      ]
    }
  ]

  constructor(private categoryService: CategoryService) { }

  add(todo: Todo) {
    let todos: Todo[] = [];
    let savedTodos: Todo[] | null = JSON.parse(String(localStorage.getItem("todos")));

    todo.id = new Date().getTime();

    if (savedTodos !== null) {
      todos = todos.concat(savedTodos);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addBuiltIn() {
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(this.BUILT_IN_TODOS));
  }

  getAll() {
    return JSON.parse(String(localStorage.getItem("todos")));
  }

  update(modifiedTodo: Todo) {
    let todos: Todo[] | null = JSON.parse(String(localStorage.getItem("todos")));
    if (todos !== null) {
      let index: number = todos.findIndex((x) => x.id === modifiedTodo.id);
      todos[index] = modifiedTodo;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  delete(id: number) {
    let todos: Todo[] | null = JSON.parse(String(localStorage.getItem("todos")));
    if (todos !== null) {
      let index: number = todos.findIndex((x) => x.id === id);
      todos?.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}