import FavouriteBlogsComponent from './pages/favourite-blogs/favourite-blogs.component';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../shared/search/search.component';
import { SearchResultsComponent } from '../shared/search-results/search-results.component';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SideMenuComponent,
    TopMenuComponent, ReactiveFormsModule, SearchComponent, SearchResultsComponent, MatDialogModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  // readonly dialog = inject(MatDialog);

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  public isMenuOpen: boolean = false;
  public hasNotification: boolean = true;
  public isSearchStarted: boolean = false;

  constructor(private dialog: MatDialog) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isNotificationOpen(): boolean {
    return this.hasNotification = false;
  }

  setStatus(started: boolean) {
    this.isSearchStarted = started;
  }

  closeSearchResults() {
    this.isSearchStarted = false;
    this.searchComponent.clearSearch();
  }

  openFavDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = '80%';
    dialogConfig.data = { specialCondition: true };

    this.dialog.open(FavouriteBlogsComponent, dialogConfig)
      .afterClosed().subscribe();

  }

}
