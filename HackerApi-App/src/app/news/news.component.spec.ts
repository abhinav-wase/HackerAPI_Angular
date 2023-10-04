import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsServiceService } from '../news-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsService: NewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [NewsServiceService],
    });

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsServiceService);

    // Mock the newsService methods
    spyOn(newsService, 'getNewestStories').and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on ngOnInit', () => {
    spyOn(component, 'loadStories');
    component.ngOnInit();
    expect(component.loadStories).toHaveBeenCalled();
  });

  it('should load stories when page changes', () => {
    spyOn(component, 'loadStories');
    component.onPageChange(2);
    expect(component.loadStories).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('should filter stories on search change', () => {
    spyOn(component, 'filterStories');
    component.onSearchChange();
    expect(component.filterStories).toHaveBeenCalled();
  });

  it('should start and stop polling', () => {
    spyOn(component, 'startPolling');
    spyOn(component, 'stopPolling');

    component.ngOnInit();
    expect(component.startPolling).toHaveBeenCalled();

    component.ngOnDestroy();
    expect(component.stopPolling).toHaveBeenCalled();
  });

  // Add more test cases based on your component's functionality
});
