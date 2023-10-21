/**
 * Represents a news item with a title and a URL.
 */
export class NewsItem {
  /**
   * The title of the news item.
   * It is marked as optional with '?' to allow for cases where a title may not be present.
   */
  title?: string;

  /**
   * The URL associated with the news item.
   * It is marked as optional with '?' to allow for cases where a URL may not be present.
   */
  url?: string;
}
