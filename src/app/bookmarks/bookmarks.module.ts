import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarksRoutingModule } from './bookmarks-router.module';
import { SharedModule } from '../shared/shared.module';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './store/effects/bookmarks.effects';
import {
  bookmarksFeatureKey,
  bookmarksReducer,
} from './store/reducers/bookmarks.reducer';

@NgModule({
  declarations: [BookmarksListComponent, BookmarkComponent],
  imports: [
    CommonModule,
    SharedModule,
    BookmarksRoutingModule,
    StoreModule.forFeature(bookmarksFeatureKey, bookmarksReducer),
    EffectsModule.forFeature([BookmarksEffects]),
  ],
  exports: [],
})
export class BookmarksModule {}
