import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../news-service.service';
import { NewsItem } from './NewsItem';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  newestStories: NewsItem[] = [];
  filteredStories: NewsItem[] = [];
  currentPage = 1;
  pageSize = 10; // Set your desired page size here
  searchQuery = '';
  private newsPollingSubscription?: Subscription;

  constructor(private newsService: NewsServiceService) {}
  ngOnInit(): void {
    this.loadStories();
    this.startPolling();
  }
  ngOnDestroy(): void {
    this.stopPolling();
  }
  loadStories():void{
    this.newsService.getNewestStories(this.currentPage, this.pageSize).subscribe(
      (data) => {
        debugger;
        console.log(data)
        this.newestStories = data;
        this.filterStories();
      },
      (error) => {
        console.error('Error fetching newest stories:', error);
      }
    );
  }
  onSearchChange(): void {
    this.filterStories();
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStories();
  }
   filterStories(): void {
    this.filteredStories = this.newestStories.filter(
       s => s.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (s.url && s.url.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
   startPolling(): void {
    this.newsPollingSubscription = interval(10000).subscribe(() => {
      this.loadStories();
    });
  }
   stopPolling(): void {
    if (this.newsPollingSubscription) {
      this.newsPollingSubscription.unsubscribe();
    }
  }

}
