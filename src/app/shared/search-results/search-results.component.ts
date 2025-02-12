import { Blog, Blogs } from '../../interfaces/blogs-interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  input,
  OnChanges,
  output,
  SimpleChanges
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpaceflightDataService } from '../../services/spaceflight.service';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnChanges {

  public showResults = input.required<boolean>();
  public closeResults = output();

  blogsResults: Blog[] = [];

  constructor(private searchService: SpaceflightDataService, private eRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showResults'] && this.showResults()) {
      this.searchService.searchResults$.subscribe(data => {

        if (data && Array.isArray(data.results)) {
          this.blogsResults = data.results;
        } else {
          this.blogsResults = [];
        }
      });
    }
  }

  onLinkClick() {
    this.closeResults.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeResults.emit();
    }
  }
}
