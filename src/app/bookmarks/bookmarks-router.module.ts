import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { bookmarksResolver } from './resolvers/bookmarks.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookmarksListComponent,
    resolve: { bookmarks: bookmarksResolver },
  },
  {
    path: ':id',
    component: BookmarkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarksRoutingModule {}
