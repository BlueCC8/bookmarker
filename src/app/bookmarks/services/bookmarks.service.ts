import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookmarkDb } from '../../shared/db/bookmarks/bookmark-db';
import { BookmarkDto } from '../models/bookmark.dto';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private bookmarksUrl = 'api/bookmarks';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getBookmarks(filter: any): Observable<BookmarkDb[]> {
    let url = this.bookmarksUrl;
    if (filter) {
      const queryParams = new URLSearchParams();
      queryParams.append('title', filter.toString());
      url += `?${queryParams.toString().replace(/\+/g, '%20')}`;
    }
    return this.http.get<BookmarkDb[]>(url);
  }

  getBookmark(id: number): Observable<BookmarkDb> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.get<BookmarkDb>(url);
  }

  addBookmark(bookmark: BookmarkDto): Observable<BookmarkDb> {
    return this.http.post<BookmarkDb>(
      this.bookmarksUrl,
      bookmark,
      this.httpOptions,
    );
  }

  updateBookmark(bookmark: BookmarkDto): Observable<any> {
    return this.http.put(this.bookmarksUrl, bookmark, this.httpOptions);
  }

  deleteBookmark(id: number): Observable<BookmarkDb> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.delete<BookmarkDb>(url, this.httpOptions);
  }
}
