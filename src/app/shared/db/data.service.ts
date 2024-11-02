import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { BookmarkDb } from './bookmarks/bookmark-db';

export class DataService implements InMemoryDbService {
  private readonly bookmarkCollectionName = 'bookmarks';
  createDb() {
    const bookmarks: BookmarkDb[] = [
      {
        id: 1,
        title: 'Bookmark 1',
        url: 'https://example.com/1',
        createdOn: new Date(),
      },
      {
        id: 2,
        title: 'Bookmark 2',
        url: 'https://example.com/2',
        createdOn: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      {
        id: 3,
        title: 'Bookmark 3',
        url: 'https://example.com/3',
        createdOn: new Date(new Date().setDate(new Date().getDate() - 2)),
      },
    ];
    return { bookmarks };
  }

  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === this.bookmarkCollectionName) {
      const title = reqInfo.query.get('title') || '';

      if (title) {
        const bookmarks = reqInfo.collection as BookmarkDb[];
        const filteredBookmarks = bookmarks.filter(b => {
          return b.title.toLowerCase().includes(title[0].toLowerCase());
        });

        return reqInfo.utils.createResponse$(() => ({
          body: [...filteredBookmarks],
          status: 200,
        }));
      }
    }
    return undefined;
  }

  getOne(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === this.bookmarkCollectionName) {
      const id = +reqInfo.id;
      const bookmark = reqInfo.collection.find((b: BookmarkDb) => b.id === id);

      if (bookmark) {
        return reqInfo.utils.createResponse$(() => ({
          body: { ...bookmark },
          status: 200,
        }));
      } else {
        return reqInfo.utils.createResponse$(() => ({
          body: { error: 'Bookmark not found' },
          status: 404,
        }));
      }
    }
    return undefined;
  }

  post(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === this.bookmarkCollectionName) {
      const bookmark = reqInfo.utils.getJsonBody(reqInfo.req);

      const newBookmark = {
        ...bookmark,
        id: this.genId(reqInfo.collection),
        createdOn: new Date(),
      };
      reqInfo.collection.push(newBookmark);

      return reqInfo.utils.createResponse$(() => ({
        body: { ...bookmark },
        status: 201,
      }));
    }
    return undefined;
  }

  put(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === this.bookmarkCollectionName) {
      const bookmark = reqInfo.utils.getJsonBody(reqInfo.req);
      const index = reqInfo.collection.findIndex(
        (b: BookmarkDb) => b.id === bookmark.id,
      );
      if (index > -1) {
        reqInfo.collection[index] = bookmark;
        return reqInfo.utils.createResponse$(() => ({
          body: { ...bookmark },
          status: 200,
        }));
      }
    }
    return undefined;
  }

  delete(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === this.bookmarkCollectionName) {
      const id = +reqInfo.id;
      const index = reqInfo.collection.findIndex(
        (b: BookmarkDb) => b.id === id,
      );
      if (index > -1) {
        reqInfo.collection.splice(index, 1);

        return reqInfo.utils.createResponse$(() => ({
          status: 204,
        }));
      }
    }
    return undefined;
  }

  private genId(bookmarks: BookmarkDb[]): number {
    return bookmarks.length > 0 ? Math.max(...bookmarks.map(b => b.id)) + 1 : 1;
  }
}
