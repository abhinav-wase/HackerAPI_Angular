/**
 * NewsComponent Test Suite
 *
 * This test suite covers the unit testing of the NewsComponent, which is responsible for
 * displaying the newest stories, handling user interactions, and managing automatic polling.
 *
 * Key Test Cases:
 * - Ensure that the component is created successfully.
 * - Verify that loadStories is called during the initialization (ngOnInit).
 * - Test the behavior of loadStories when the page changes.
 * - Confirm that filterStories is called when the search query changes.
 * - Test the startPolling and stopPolling methods.
 *
 * Note: Mocks are used for dependencies such as the NewsServiceService to isolate
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsServiceService } from '../services/news-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsService: NewsServiceService;

  beforeEach(() => {
    // Setting up the testing module with necessary dependencies
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [NewsServiceService],
    });

    // Creating the component and injecting the mock service
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsServiceService);

    // Mocking the service method to return an observable of an empty array
    spyOn(newsService, 'getNewestStories').and.returnValue(of([]));
  });

  // Ensuring that the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifying that loadStories is called during ngOnInit
  it('should load stories on ngOnInit', () => {
    spyOn(component, 'loadStories');
    component.ngOnInit();
    expect(component.loadStories).toHaveBeenCalled();
  });

  // Testing the behavior of loadStories when the page changes
  it('should load stories when page changes', () => {
    spyOn(component, 'loadStories');
    component.onPageChange(2);
    expect(component.loadStories).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  // Confirming that filterStories is called on search change
  it('should filter stories on search change', () => {
    spyOn(component, 'filterStories');
    component.onSearchChange();
    expect(component.filterStories).toHaveBeenCalled();
  });

  // Testing the startPolling and stopPolling methods
  it('should start and stop polling', () => {
    spyOn(component, 'startPolling');
    spyOn(component, 'stopPolling');

    // Calling ngOnInit to trigger startPolling
    component.ngOnInit();
    expect(component.startPolling).toHaveBeenCalled();

    // Calling ngOnDestroy to trigger stopPolling
    component.ngOnDestroy();
    expect(component.stopPolling).toHaveBeenCalled();
  });
});
