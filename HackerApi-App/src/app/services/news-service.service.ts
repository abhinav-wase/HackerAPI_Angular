/**
 * NewsServiceService
 *
 * This Angular service interacts with a .NET Core API to fetch the newest stories.
 * It includes a method to retrieve stories based on pagination and filters out items
 * with null or empty URLs.
 *
 * Key Features:
 * - Provides a method to fetch the newest stories from the API.
 * - Supports pagination by allowing users to specify the page number and page size.
 * - Filters out items with null or empty URLs using the RxJS map operator.
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NewsItem } from '../news/NewsItem';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  // Replace with the actual URL of your .NET Core API
  private apiUrl = 'https://localhost:44398/api/News';

  constructor(private http: HttpClient) { }

  /**
   * Fetches the newest stories from the API.
   * @param page The page number.
   * @param pageSize The number of items per page.
   * @returns An Observable of NewsItem[] representing the newest stories.
   */
  getNewestStories(page: number, pageSize: number): Observable<NewsItem[]> {
    // Construct the URL with page and pageSize as query parameters
    const url = `${this.apiUrl}/newest?page=${page}&pageSize=${pageSize}`;

    // Make a GET request to the API endpoint
    return this.http.get<NewsItem[]>(url).pipe(
      // Use the map operator to filter out items with null or empty urls
      map(items => items.filter(item => !!item.url))
    );
  }
}
