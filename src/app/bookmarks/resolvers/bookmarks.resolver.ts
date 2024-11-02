import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take, tap } from 'rxjs/operators';
import { ResolveFn } from '@angular/router';
import { selectFilter } from '../store/selectors/bookmarks.selectors';
import { fetchBookmarks } from '../store/actions/bookmarks.actions';

export const bookmarksResolver: ResolveFn<any> = () => {
  const store = inject(Store);
  let filter = '';
  return store.select(selectFilter).pipe(
    tap(data => {
      return store.dispatch(fetchBookmarks({ filter }));
    }),
  );
};
