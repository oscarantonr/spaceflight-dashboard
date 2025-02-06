import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output
  } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SpaceflightDataService } from '../../services/spaceflight.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchControl: FormControl;
  @Output() searchStarted = new EventEmitter<boolean>();

  private searchService = inject(SpaceflightDataService);

  constructor() {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      if (value.length > 3) {
        this.searchStarted.emit(true);
        this.searchText(value);
      } else {
        this.searchStarted.emit(false);
      }
    });
  }

  searchText(value: string): void {
    this.searchService.searchByWords(value)
      .subscribe()
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
