import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  faCoffee = faCoffee;
  filter: string = "all";

  onFilter(filter: string) {
    console.log(filter);
    this.filter = filter;
  }
}
