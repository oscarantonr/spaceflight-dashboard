import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-top-menu',
  imports: [RouterModule],
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter(route => route && route && route.path)
    .filter(route => !route.path?.includes(':'))
}
