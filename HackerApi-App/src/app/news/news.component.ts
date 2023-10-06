/**
 * NewsComponent
 *
 * This component displays the newest stories retrieved from a backend service.
 * It includes features such as pagination, search filtering, and automatic polling for updates.
 *
 * Key Features:
 * - Display a list of newest stories with pagination controls.
 * - Allow users to search for stories based on titles or URLs.
 * - Automatically fetch new stories at regular intervals using polling.
 * - Manage loading states to indicate when stories are being retrieved.
 *
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsServiceService } from '../services/news-service.service';
import { NewsItem } from './NewsItem';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  newestStories: NewsItem[] = [];
  filteredStories: NewsItem[] = [];
  currentPage = 1;
  pageSize = 10; // Set your desired page size here
  searchQuery = '';
  loading = false;
  private newsPollingSubject = new Subject<void>();

  constructor(private newsService: NewsServiceService) {}

  ngOnInit(): void {
    // Initial load of stories and start polling
    this.loadStories();
    this.startPolling();
  }

  ngOnDestroy(): void {
    // Stop polling to prevent memory leaks
    this.stopPolling();
  }

  loadStories(): void {
    // Set loading flag to true before making the request
    this.loading = true;

    // Fetch newest stories from the service
    this.newsService.getNewestStories(this.currentPage, this.pageSize).subscribe(
      (data) => {
        // Update stories and filter based on search query
        this.newestStories = data;
        this.filterStories();

        // Set loading flag to false after the request completes
        this.loading = false;
      },
      (error) => {
        // Log and handle errors, and set loading flag to false
        console.error('Error fetching newest stories:', error);
        this.loading = false;
      }
    );
  }

  onSearchChange(): void {
    // Trigger filtering when the search query changes
    this.filterStories();
  }

  onPageChange(page: number): void {
    // Change the current page and reload stories
    this.currentPage = page;
    this.loadStories();
  }

  filterStories(): void {
    // Filter stories based on the search query
    this.filteredStories = this.newestStories.filter(
      s => s.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (s.url && s.url.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  startPolling(): void {
    // Start polling for new stories every 10 seconds
    interval(10000)
      .pipe(takeUntil(this.newsPollingSubject)) // Stop polling on ngOnDestroy
      .subscribe(() => {
        this.loadStories();
      });
  }

  stopPolling(): void {
    // Stop polling to prevent memory leaks
    this.newsPollingSubject.next();
    this.newsPollingSubject.complete();
  }
}
