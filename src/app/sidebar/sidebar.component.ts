import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Category } from '../shared/models/Category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  @Output() onFilter: EventEmitter<string> = new EventEmitter();

  categories: Category[] = [];
  filter = "all";

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
  }

  onClick(filter: string) {
    this.filter = filter;
    this.onFilter.emit(filter);
  }

  getActive(filter: string) {
    if (filter == this.filter) {
      return "active";
    }
    return "inactive";
  }
}
