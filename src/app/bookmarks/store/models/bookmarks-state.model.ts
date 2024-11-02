import { BookmarkDto } from '../../models/bookmark.dto';
import { Bookmark } from '../../models/bookmark.model';

export interface BookmarksStateModel {
  bookmarks: BookmarkDto[];
  bookmark: BookmarkDto;
  filter: string;
}
