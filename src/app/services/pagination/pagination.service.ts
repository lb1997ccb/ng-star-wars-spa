import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  targetPageIndex = 1;

  setTargetPageIndex(index: number): void {
    this.targetPageIndex = index;
  }

  getTargetPageIndex(): number {
    return this.targetPageIndex;
  }
}
