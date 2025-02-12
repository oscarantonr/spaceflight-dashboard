import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional
} from '@angular/core';
import { FavouriteBlogs } from '../../../interfaces/favourite-blogs.interface';
import { FavouriteButtonComponent } from '../../../shared/favourite-button/favourite-button.component';
import { FavouriteService } from '../../../services/favourite.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-favourite-blogs',
  imports: [CommonModule, RouterModule, TitleComponent, FavouriteButtonComponent, CdkDropList, CdkDrag],
  templateUrl: './favourite-blogs.component.html',
  styles: ``
})
export default class FavouriteBlogsComponent implements OnInit {
  favouriteBlogs: FavouriteBlogs[] = [];
  specialCondition: boolean = false;

  constructor(
    private favouriteService: FavouriteService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<FavouriteBlogsComponent>
  ) {
    if (data) {
      this.specialCondition = data.specialCondition;
    }
  }

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

  onLinkClick(): void {
    if (this.specialCondition) {
      this.dialogRef.close();
    }
  }
}
