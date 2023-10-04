import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, map } from 'rxjs';
import { NewsItem } from './news/NewsItem';
@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  private apiUrl = 'https://localhost:44398/api/News'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getNewestStories(page: number, pageSize: number): Observable<NewsItem[]> {
      
      return this.http.get<NewsItem[]>(`${this.apiUrl}/newest?page=${page}&pageSize=${pageSize}`).pipe(
        map(x => x.filter(items => items.url !== null && items.url !== undefined && items.url !== ""))
      );
  }
}
