import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import {
  addBookmark,
  addBookmarkFailure,
  addBookmarkSuccess,
  deleteBookmark,
  deleteBookmarkFailure,
  deleteBookmarkSuccess,
  editBookmark,
  editBookmarkFailure,
  editBookmarkSuccess,
  fetchBookmark,
  fetchBookmarkFailure,
  fetchBookmarks,
  fetchBookmarksFailure,
  fetchBookmarksSuccess,
  fetchBookmarkSuccess,
} from '../actions/bookmarks.actions';
import { BookmarksService } from '../../services/bookmarks.service';

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private bookmarksService: BookmarksService,
  ) {}

  fetchBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBookmarks),
      exhaustMap(action => {
        return this.bookmarksService.getBookmarks(action.filter).pipe(
          map(rawBookmarks => {
            const bookmarks = rawBookmarks.map(bookmark => {
              return {
                id: bookmark.id,
                title: bookmark.title,
                url: bookmark.url,
                createdOn: bookmark.createdOn,
              };
            });

            return fetchBookmarksSuccess({ bookmarks });
          }),
          catchError(error => of(fetchBookmarksFailure({ error }))),
        );
      }),
    ),
  );
  fetchBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBookmark),
      exhaustMap(action => {
        return this.bookmarksService.getBookmark(action.id).pipe(
          map(rawBookmark => {
            const bookmark = { ...rawBookmark };

            return fetchBookmarkSuccess({ bookmark });
          }),
          catchError(error => of(fetchBookmarkFailure({ error }))),
        );
      }),
    ),
  );

  editBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBookmark),
      exhaustMap(action => {
        return this.bookmarksService.updateBookmark(action.payload).pipe(
          map(rawBookmark => {
            const bookmark = { ...rawBookmark };

            return editBookmarkSuccess({ bookmark });
          }),
          catchError(error => of(editBookmarkFailure({ error }))),
        );
      }),
    ),
  );

  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookmark),
      exhaustMap(action => {
        return this.bookmarksService.deleteBookmark(action.id).pipe(
          map(_ => {
            return deleteBookmarkSuccess({ id: action.id });
          }),
          catchError(error => of(deleteBookmarkFailure({ error }))),
        );
      }),
    ),
  );

  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBookmark),
      exhaustMap(action => {
        return this.bookmarksService.addBookmark(action.payload).pipe(
          map(rawBookmark => {
            const bookmark = { ...rawBookmark };

            return addBookmarkSuccess({ bookmark });
          }),
          catchError(error => of(addBookmarkFailure({ error }))),
        );
      }),
    ),
  );
}
