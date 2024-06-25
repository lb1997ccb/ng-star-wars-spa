import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private __cache: { [url: string]: unknown } = {}; // Cache object with URL keys

  /**
   * Checks if data for a specific URL is cached.
   * @param url The URL to check for cached data.
   * @returns True if data is cached for the URL, false otherwise.
   */
  isCached(url: string): boolean {
    return this.__cache.hasOwnProperty(url);
  }

  /**
   * Retrieves cached data for a specific URL.
   * @param url The URL to retrieve cached data from.
   * @returns The cached data if available, otherwise undefined.
   */
  getData(url: string): unknown {
    return this.__cache[url];
  }

  /**
   * Sets cached data for a specific URL.
   * @param url The URL to set cached data for.
   * @returns A function that accepts data to be cached.
   */
  setData(url: string): (data: unknown) => void {
    return (data: unknown) => {
      if (data) {
        this.__cache[url] = data;
      }
    };
  }
}
