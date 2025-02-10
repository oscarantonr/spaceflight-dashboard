import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FavouriteBlogs } from '../../../interfaces/favourite-blogs.interface';
import { FavouriteButtonComponent } from '../../../shared/favourite-button/favourite-button.component';
import { FavouriteService } from '../../../services/favourite.service';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-favourite-blogs',
  imports: [CommonModule, RouterModule, TitleComponent, FavouriteButtonComponent, CdkDropList, CdkDrag],
  templateUrl: './favourite-blogs.component.html',
  styles: ``
})
export default class FavouriteBlogsComponent {
  private favouriteService = inject(FavouriteService);
  favouriteBlogs: FavouriteBlogs[] = [];

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favouriteService.getFavourites().subscribe((data) => {
      this.favouriteBlogs = data;
    });
  }

  isFavourite(blog: FavouriteBlogs): boolean {
    return this.favouriteService.isFavourite(blog, this.favouriteBlogs);
  }

  toggleFavourite(blog: FavouriteBlogs): void {
    if (this.isFavourite(blog)) {
      this.favouriteService.removeFavourite(blog.id).subscribe(() => {
        this.loadFavourites();
      });
    } else {
      this.favouriteService.addFavourite(blog).subscribe(() => {
        this.loadFavourites();
      });
    }
  }

  drop(event: CdkDragDrop<FavouriteBlogs[]>) {
    moveItemInArray(this.favouriteBlogs, event.previousIndex, event.currentIndex);
  }
}
