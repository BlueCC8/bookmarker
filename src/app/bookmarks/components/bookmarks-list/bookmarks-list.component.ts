import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkType } from '../../enums/bookmark-type.enum';
import { BookmarkOverlay } from '../../models/bookmark-overlay.model';
import { Router } from '@angular/router';

import { SubSink } from 'subsink';
import { BookmarksStateModel } from '../../store/models/bookmarks-state.model';
import { select, Store } from '@ngrx/store';
import {
  selectAllBookmarks,
  selectFilter,
} from '../../store/selectors/bookmarks.selectors';
import { BookmarkDto } from '../../models/bookmark.dto';
import { deleteBookmark } from '../../store/actions/bookmarks.actions';

@Component({
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  todaysBookmarks: Bookmark[] = [];
  yesterdaysBookmarks: Bookmark[] = [];
  olderBookmarks: Bookmark[] = [];
  bookmarks: BookmarkOverlay[] = [];

  subsink = new SubSink();
  bookmarksDto: BookmarkDto[] = [];
  currentFilter = '';
  constructor(
    private router: Router,
    private store: Store<BookmarksStateModel>,
  ) {
    this.subsink.sink = this.store
      .pipe(select(selectAllBookmarks))
      .subscribe(bookmarks => {
        this.refreshBookmarkLists();

        this.bookmarksDto = JSON.parse(JSON.stringify(bookmarks));
        for (const bookmarkDto of this.bookmarksDto) {
          this.mapToBookmark(bookmarkDto);
        }
      });
  }

  private mapToBookmark(bookmarkDto: BookmarkDto) {
    //Improvement: use luxon for date manipulation
    const createdDate = new Date(bookmarkDto.createdOn);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const bookmark = {
      id: bookmarkDto.id,
      title: bookmarkDto.title,
      url: bookmarkDto.url,
      type: BookmarkType.Unknown,
    };

    if (createdDate.toDateString() === today.toDateString()) {
      bookmark.type = BookmarkType.Today;
      this.todaysBookmarks.push(bookmark);
    } else if (createdDate.toDateString() === yesterday.toDateString()) {
      bookmark.type = BookmarkType.Yesterday;
      this.yesterdaysBookmarks.push(bookmark);
    } else {
      bookmark.type = BookmarkType.Older;
      this.olderBookmarks.push(bookmark);
    }
  }

  refreshBookmarkLists() {
    this.todaysBookmarks = [];
    this.yesterdaysBookmarks = [];
    this.olderBookmarks = [];
    this.bookmarks = this.bookmarkGroups;
  }

  get bookmarkGroups() {
    return [
      { list: this.todaysBookmarks, title: 'Today' },
      { list: this.yesterdaysBookmarks, title: 'Yesterday' },
      { list: this.olderBookmarks, title: 'Older' },
    ];
  }

  ngOnInit(): void {
    this.subsink.sink = this.store
      .pipe(select(selectFilter))
      .subscribe(filter => {
        this.currentFilter = filter;
      });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  editBookmark(id: number) {
    this.router.navigate([`/bookmarks/${id}`]);
  }
  deleteBookmark(id: number) {
    this.store.dispatch(deleteBookmark({ id }));
  }
}
