import { Blog } from '../../interfaces/blogs-interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output
} from '@angular/core';
import { FavouriteBlogs } from '../../interfaces/favourite-blogs.interface';
import { FavouriteService } from '../../services/favourite.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourite-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './favourite-button.component.html',
  styles: ``
})
export class FavouriteButtonComponent {
  // public blog = input<FavouriteBlogs>();
  // public favouriteToggled = output();

  @Input() blog!: FavouriteBlogs | Blog;
  @Input() alreadyFavourite!: boolean;
  @Output() favouriteToggled = new EventEmitter<void>();


  constructor(private favouriteService: FavouriteService) { }

  isFavourite(): boolean {
    console.log("Favourite", this.blog)
    return this.alreadyFavourite || this.favouriteService.isFavourite(this.blog as FavouriteBlogs, this.favouriteService.favouritesSubject.value);
  }

  toggleFavourite(): void {
    if (this.isFavourite()) {
      this.favouriteService.removeFavourite((this.blog as FavouriteBlogs).id).subscribe(() => {
        this.favouriteToggled.emit();
      });
    } else {
      this.favouriteService.addFavourite(this.blog as FavouriteBlogs).subscribe(() => {
        this.favouriteToggled.emit();
      });
    }
  }
}
