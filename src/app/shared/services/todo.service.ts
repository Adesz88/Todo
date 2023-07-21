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
      id: 1689678910523,
      title: "Meeting with Fabio",
      date: new Date("2023-07-19T00:00:00.000Z"),
      time: "11:20",
      details: "",
      subtasks: [],
      categories: [
        {
          name: "Work",
          color: "info"
        },
        {
          name: "Outdoor",
          color: "success"
        }
      ],
      completed: true
    },
    {
      id: 1689678890941,
      title: "Angular mini project",
      date: new Date("2023-07-21T00:00:00.000Z"),
      details: "",
      time: "13:00",
      subtasks: [],
      categories: [
        {
          name: "Work",
          color: "info"
        },
        {
          name: "Indoor",
          color: "secondary"
        }
      ],
      completed: false
    },
    {
      id: 1689678890941,
      title: "Coffee with Olivia",
      date: new Date("2023-07-23T00:00:00.000Z"),
      details: "Cafe Frei at Balaton st.",
      time: "16:00",
      subtasks: [],
      categories: [
        {
          name: "Personal",
          color: "warning"
        },
        {
          name: "Outdoor",
          color: "success"
        }
      ],
      completed: false
    },
    {
      id: 1689678903073,
      title: "Buy ingredients for spaghetti bolognese",
      date: new Date("2023-07-22T00:00:00.000Z"),
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
        },
        {
          name: "Outdoor",
          color: "success"
        }
      ],
      completed: false
    },
    {
      id: 1689678910523,
      title: "Plant the flowers",
      date: new Date("2023-07-20T00:00:00.000Z"),
      details: "",
      subtasks: [],
      categories: [
        {
          name: "Personal",
          color: "warning"
        },
        {
          name: "Outdoor",
          color: "success"
        }
      ],
      completed: false
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

  getAll(filter: string) {
    let todos: Todo[] = JSON.parse(String(localStorage.getItem("todos")));
    switch (filter) {
      case "all":
        return todos.filter(x => !x.completed);

      case "completed":
        return todos.filter(x => x.completed);

      default:
        return todos.filter(x => {
          if (x.categories.findIndex((x) => x.name === filter) > -1) {
            return true;
          } else {
            return false;
          }
        });
    }
  }

  getCompleted() {
    let todos: Todo[] = JSON.parse(String(localStorage.getItem("todos")));
    return todos.filter(x => !x.completed);
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