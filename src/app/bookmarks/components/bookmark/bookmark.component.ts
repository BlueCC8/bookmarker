import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarksService } from '../../services/bookmarks.service';
import { BookmarksStateModel } from '../../store/models/bookmarks-state.model';
import { select, Store } from '@ngrx/store';
import {
  selectAllBookmarks,
  selectBookmark,
} from '../../store/selectors/bookmarks.selectors';
import { BookmarkDto } from '../../models/bookmark.dto';
import { SubSink } from 'subsink';
import {
  addBookmark,
  editBookmark,
  fetchBookmark,
} from '../../store/actions/bookmarks.actions';

@Component({
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit, OnDestroy {
  bookmark: BookmarkDto = new BookmarkDto();
  editMode = false;
  subsink = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookmarksService: BookmarksService,
    private store: Store<BookmarksStateModel>,
  ) {}
  ngOnInit(): void {
    this.subsink.sink = this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.bookmark.id = id;
      if (this.bookmark.id > 0) {
        this.getCurrentBookmark(id);
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });

    this.subsink.sink = this.store
      .pipe(select(selectBookmark))
      .subscribe(bookmark => {
        if (bookmark) {
          this.bookmark = { ...bookmark };
        }
      });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
  private getCurrentBookmark(id: number) {
    this.subsink.sink = this.store
      .pipe(select(selectAllBookmarks))
      .subscribe(bookmarks => {
        this.store.dispatch(fetchBookmark({ id }));
      });
  }

  saveBookmark() {
    if (this.editMode) {
      this.store.dispatch(editBookmark({ payload: this.bookmark }));
    } else {
      this.store.dispatch(addBookmark({ payload: this.bookmark }));
    }
    this.router.navigate(['/bookmarks']);
  }
}
