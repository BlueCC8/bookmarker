import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { BookmarksStateModel } from '../../../bookmarks/store/models/bookmarks-state.model';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { selectAllBookmarks } from '../../../bookmarks/store/selectors/bookmarks.selectors';
import { BookmarkDto } from '../../../bookmarks/models/bookmark.dto';
import {
  fetchBookmarks,
  setFilter,
} from '../../../bookmarks/store/actions/bookmarks.actions';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search...';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  subsink = new SubSink();
  bookmarksDto: BookmarkDto[] = [];
  constructor(
    private router: Router,
    private store: Store<BookmarksStateModel>,
  ) {
    this.subsink.sink = this.store
      .pipe(select(selectAllBookmarks))
      .subscribe(bookmarks => {
        if (!bookmarks) {
          return;
        }
        this.bookmarksDto = JSON.parse(JSON.stringify(bookmarks));
        this.options = this.bookmarksDto.map(bookmark => bookmark.title);
      });
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => {
        this.store.dispatch(setFilter({ filter: value }));
        this.store.dispatch(fetchBookmarks({ filter: value }));
        return (this.options = []);
      }),
    );
  }

  ngOnDestroy(): void {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue),
    );
  }
}
