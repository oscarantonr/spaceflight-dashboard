import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Blog } from '../../../interfaces/blogs-interface';
import { CommonModule } from '@angular/common';
import { FavouriteButtonComponent } from '../../../shared/favourite-button/favourite-button.component';
import { FavouriteService } from '../../../services/favourite.service';
import { map, switchMap } from 'rxjs';
import { SpaceflightDataService } from '../../../services/spaceflight.service';
import { TitleComponent } from '../../../shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Component,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, TitleComponent, FavouriteButtonComponent],
  templateUrl: './blog.component.html',
})
export default class BlogComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public blogService = inject(SpaceflightDataService);
  public blogs: Blog[] = [];
  public currentIndex: number = -1;
  public favourites: any[] = [];

  public blog = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.blogService.getBlogById(id))
    )
  )
  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.loadBlogs();
    this.loadFavourites();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.currentIndex = this.blogs.findIndex(b => b.id === +id);
        }
      });
    });
  }

  goToPreviousBlog() {
    if (this.currentIndex > 0) {
      const previousBlogId = this.blogs[this.currentIndex - 1].id;
      this.router.navigate(['/dashboard/blog', previousBlogId]);
    }
  }

  goToNextBlog() {
    if (this.currentIndex < this.blogs.length - 1) {
      const nextBlogId = this.blogs[this.currentIndex + 1].id;
      this.router.navigate(['/dashboard/blog', nextBlogId]);
    }
  }

  goToBlog(id: number) {
    this.blogService.getBlogById(id)
      .pipe(
        map(data => { return data; })
      ).subscribe();
  }

  loadFavourites(): void {
    this.favouriteService.getFavourites().subscribe((data) => {
      this.favourites = data;
    });
  }

  toggleFavourite(blog: any): void {
    if (this.favouriteService.isFavourite(blog, this.favourites)) {
      this.favouriteService.removeFavourite(blog.id).subscribe(() => {
        this.loadFavourites();
      });
    } else {
      this.favouriteService.addFavourite(blog).subscribe(() => {
        this.loadFavourites();
      });
    }
  }

  isFavourite(blog: any): boolean {
    return this.favouriteService.isFavourite(blog, this.favourites);
  }
}
