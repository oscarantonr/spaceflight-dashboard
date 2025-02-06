import { Blog } from '../../../interfaces/blogs-interface';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SpaceflightDataService } from '../../../services/spaceflight.service';
import { TitleComponent } from '../../../shared/title/title.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './blogs.component.html',
})
export default class BlogsComponent {
  private blogsService = inject(SpaceflightDataService);
  blogs: Blog[] = [];

  ngOnInit(): void {
    this.blogsService.getBlogs()
      .pipe(
        tap((blogs) => {
          this.blogs = blogs;
        })
      ).subscribe();
  }


  getBlogById(id: number) {
    this.blogsService.getBlogById(id)
      .pipe(
        map(data => data)
      ).subscribe();
  }
}
