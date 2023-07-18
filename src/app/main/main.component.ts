import { Component } from '@angular/core';
import { Category } from '../shared/models/Category';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  readonly BUILTIN_CATEGORIES: Category[] = [
    {
      name: "Expired",
      color: "danger"
    },
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
  ]
}
