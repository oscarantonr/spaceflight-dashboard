import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Blog } from '../../../interfaces/blogs-interface';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, RouterModule, TitleComponent],
  templateUrl: './blog.component.html',
})
export default class BlogComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public blogService = inject(SpaceflightDataService);
  public blogs: Blog[] = [];
  public currentIndex: number = -1;

  public blog = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.blogService.getBlogById(id))
    )
  )

  ngOnInit(): void {
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
        map(data => { console.log("Compo", data); return data; })
      ).subscribe();

  }
}
