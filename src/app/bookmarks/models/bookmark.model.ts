import { BookmarkType } from '../enums/bookmark-type.enum';

export class Bookmark {
  id: number = 0;
  type: BookmarkType | undefined;
  title: string = '';
  url: string = '';
}
