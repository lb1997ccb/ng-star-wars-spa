import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private __cache: any = {};

  isCashed(url: string) {
    return this.__cache[url];
  }
  getData(url: string) {
    return this.__cache[url];
  }

  setData(url: string) {
    return (data: unknown) => {
      if (data) {
        this.__cache[url] = data;
      }
    };
  }
}
