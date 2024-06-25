import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CachingService } from '../caching/caching.service';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'https://www.swapi.tech/api/people';
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cachingService: CachingService
  ) {}

  getPosts(page?: number): Observable<any> {
    return this.handleRequest(
      page ? `${this.url}?page=${page}&limit=10` : this.url
    );
  }

  getPersonDetails(id: string | null): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.handleRequest(url);
  }

  getPlanetDetails(url: string): Observable<any> {
    return this.handleRequest(url);
  }

  private handleRequest(url: string): Observable<any> {
    if (this.cachingService.isCached(url)) {
      return of(this.cachingService.getData(url));
    } else {
      return this.httpClient.get<Observable<any>>(url).pipe(
        tap(this.cachingService.setData(url)),
        catchError(() => {
          return EMPTY;
        })
      );
    }
  }
}
