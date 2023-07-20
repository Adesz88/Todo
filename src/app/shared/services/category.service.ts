import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly BUILT_IN_CATEGORIES: Category[] = [
    {
      name: "Personal",
      color: "warning",
    },
    {
      name: "Work",
      color: "info"
    },
    {
      name: "Indoor",
      color: "secondary"
    },
    {
      name: "Outdoor",
      color: "success"
    }
  ];

  constructor() { }

  getAll() {
    return this.BUILT_IN_CATEGORIES;
  }

  get(name: string) {
    let index: number = this.BUILT_IN_CATEGORIES.findIndex((x) => x.name === name);
    return this.BUILT_IN_CATEGORIES[index];
  }
}
