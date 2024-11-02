import { createReducer, on } from '@ngrx/store';
import { BookmarksStateModel } from '../models/bookmarks-state.model';
import {
  addBookmarkFailure,
  addBookmarkSuccess,
  deleteBookmarkFailure,
  deleteBookmarkSuccess,
  editBookmarkSuccess,
  fetchBookmarkFailure,
  fetchBookmarksFailure,
  fetchBookmarksSuccess,
  fetchBookmarkSuccess,
  setFilter,
} from '../actions/bookmarks.actions';
import { BookmarkDto } from '../../models/bookmark.dto';

export const bookmarksFeatureKey = 'bookmark';

export const initialState: BookmarksStateModel = {
  bookmarks: [],
  bookmark: new BookmarkDto(),
  filter: '',
};

export const bookmarksReducer = createReducer(
  initialState,

  on(fetchBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks: bookmarks,
  })),
  on(fetchBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmark: bookmark,
  })),

  on(editBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmark: bookmark,
  })),

  on(addBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
    bookmark: new BookmarkDto(),
  })),
  on(deleteBookmarkSuccess, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id),
    bookmark: state.bookmark.id == id ? new BookmarkDto() : state.bookmark,
  })),

  on(setFilter, (state, { filter }) => ({
    ...state,
    filter: filter,
  })),
  on(fetchBookmarkFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
  on(fetchBookmarksFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
  on(deleteBookmarkFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
  on(addBookmarkFailure, (state, { error }) => {
    console.error(error);
    return state;
  }),
);
