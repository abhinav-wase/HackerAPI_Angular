/**
 * NewsServiceService Test Suite
 *
 * This test suite covers the unit testing of the NewsServiceService, which is responsible for
 * fetching the newest stories from a backend API and filtering items without a URL.
 *
 * Key Test Cases:
 * - Ensure that the service is created successfully.
 * - Test the behavior of fetching newest stories and filtering items without a URL.
 *
 * Note: Mocks are used for dependencies such as HttpTestingController to isolate
 */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsServiceService } from './news-service.service';
import { NewsItem } from '../news/NewsItem';

describe('NewsServiceService', () => {
  let service: NewsServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsServiceService]
    });

    // Create an instance of the service and the HttpTestingController
    service = TestBed.inject(NewsServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no outstanding HTTP requests are pending after each test
    httpMock.verify();
  });

  it('should be created', () => {
    // Ensure that the service is created successfully
    expect(service).toBeTruthy();
  });

  it('should get newest stories and filter items without a URL', () => {
    // Arrange: Set up test data
    const page = 1;
    const pageSize = 10;

    const mockResponse: NewsItem[] = [
      { title: 'Story 1', url: 'http://example.com/story1' },
      { title: 'Story 2', url: undefined },
      { title: 'Story 3', url: '' },
      // Add more mock data as needed
    ];

    // Act: Call the method being tested
    service.getNewestStories(page, pageSize).subscribe(stories => {
      // Assert: Check the result of the method
      expect(stories.length).toBe(1); // Only one story has a valid URL
      expect(stories[0].title).toBe('Story 1');
    });

    // Assert: Check that the expected HTTP request was made
    const req = httpMock.expectOne(`${service['apiUrl']}/newest?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    
    // Respond to the request with mock data
    req.flush(mockResponse);
  });
});
