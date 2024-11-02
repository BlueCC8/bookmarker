import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkDto } from '../../models/bookmark.dto';

export const FETCH_BOOKMARKS = '[Bookmarks] Fetch bookmarks';
export const FETCH_BOOKMARKS_SUCCESS = '[Bookmarks] Fetch bookmarks success';
export const FETCH_BOOKMARKS_FAILURE = '[Bookmarks] Fetch bookmarks failure';

export const FETCH_BOOKMARK = '[Bookmarks] Fetch bookmark';
export const FETCH_BOOKMARK_SUCCESS = '[Bookmarks] Fetch bookmark success';
export const FETCH_BOOKMARK_FAILURE = '[Bookmarks] Fetch bookmark failure';

export const ADD_BOOKMARK = '[Bookmarks] Add bookmark';
export const ADD_BOOKMARK_SUCCESS = '[Bookmarks] Add bookmark success';
export const ADD_BOOKMARK_FAILURE = '[Bookmarks] Add bookmark failure';

export const EDIT_BOOKMARK = '[Bookmarks] Edit bookmark';
export const EDIT_BOOKMARK_SUCCESS = '[Bookmarks] Edit bookmark success';
export const EDIT_BOOKMARK_FAILURE = '[Bookmarks] Edit bookmark failure';

export const DELETE_BOOKMARK = '[Bookmarks] Delete bookmark';
export const DELETE_BOOKMARK_SUCCESS = '[Bookmarks] Delete bookmark success';
export const DELETE_BOOKMARK_FAILURE = '[Bookmarks] Delete bookmark failure';

export const SET_FILTER = '[Bookmarks] Set filter';

export const setFilter = createAction(SET_FILTER, props<{ filter: string }>());

export const fetchBookmarks = createAction(
  FETCH_BOOKMARKS,
  props<{ filter: string }>(),
);

export const fetchBookmarksSuccess = createAction(
  FETCH_BOOKMARKS_SUCCESS,
  props<{ bookmarks: BookmarkDto[] }>(),
);

export const fetchBookmarksFailure = createAction(
  FETCH_BOOKMARKS_FAILURE,
  props<any>(),
);

export const fetchBookmark = createAction(
  FETCH_BOOKMARK,
  props<{ id: number }>(),
);

export const fetchBookmarkSuccess = createAction(
  FETCH_BOOKMARK_SUCCESS,
  props<{ bookmark: BookmarkDto }>(),
);

export const fetchBookmarkFailure = createAction(
  FETCH_BOOKMARK_FAILURE,
  props<any>(),
);

export const addBookmark = createAction(
  ADD_BOOKMARK,
  props<{ payload: BookmarkDto }>(),
);

export const addBookmarkSuccess = createAction(
  ADD_BOOKMARK_SUCCESS,
  props<{ bookmark: any }>(),
);

export const addBookmarkFailure = createAction(
  ADD_BOOKMARK_FAILURE,
  props<any>(),
);

export const editBookmark = createAction(
  EDIT_BOOKMARK,
  props<{ payload: BookmarkDto }>(),
);

export const editBookmarkSuccess = createAction(
  EDIT_BOOKMARK_SUCCESS,
  props<{ bookmark: BookmarkDto }>(),
);

export const editBookmarkFailure = createAction(
  EDIT_BOOKMARK_FAILURE,
  props<any>(),
);

export const deleteBookmark = createAction(
  DELETE_BOOKMARK,
  props<{ id: number }>(),
);

export const deleteBookmarkSuccess = createAction(
  DELETE_BOOKMARK_SUCCESS,
  props<{ id: number }>(),
);

export const deleteBookmarkFailure = createAction(
  DELETE_BOOKMARK_FAILURE,
  props<any>(),
);
