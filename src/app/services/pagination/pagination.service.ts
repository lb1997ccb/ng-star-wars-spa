import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private targetPageIndex = 1; // Default target page index

  /**
   * Sets the target page index for pagination.
   * @param index The index of the target page.
   */
  setTargetPageIndex(index: number): void {
    this.targetPageIndex = index;
  }

  /**
   * Retrieves the current target page index for pagination.
   * @returns The current target page index.
   */
  getTargetPageIndex(): number {
    return this.targetPageIndex;
  }
}
