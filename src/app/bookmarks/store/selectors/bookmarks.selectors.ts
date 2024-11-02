import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksStateModel } from '../models/bookmarks-state.model';
import { bookmarksFeatureKey } from '../reducers/bookmarks.reducer';

export const selectBookmarksState =
  createFeatureSelector<BookmarksStateModel>(bookmarksFeatureKey);

export const selectAllBookmarks = createSelector(
  selectBookmarksState,
  state => state?.bookmarks,
);

export const selectFilter = createSelector(
  selectBookmarksState,
  state => state.filter,
);

export const selectBookmark = createSelector(
  selectBookmarksState,
  state => state.bookmark,
);
