import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from '../../services/post/post.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { PersonListViewModel, isPersonListViewModel } from './types';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass'],
})
export class PersonListComponent implements OnInit {
  @Input() personList?: PersonListViewModel; // List of persons to display

  p = 1; // Current page index
  pageSize = 10; // Number of items per page

  paginatorIndex: number; // Index for the paginator
  paginatorDisabled = false; // Indicates if paginator should be disabled
  showEmpty = false; // Indicates if the list is empty and should show a message

  constructor(
    private readonly postService: PostService,
    private readonly paginationService: PaginationService
  ) {
    this.p = this.paginationService.getTargetPageIndex();
    this.paginatorIndex = this.p - 1;
  }

  ngOnInit() {
    // Load initial data on component initialization
    this.handleRequest(this.p);
  }

  /**
   * Handles page change events triggered by the paginator.
   * @param $event The page event object containing information about the pagination change.
   */
  handlePageEvent($event: PageEvent) {
    this.paginatorDisabled = true;

    // Determine the new page index based on the paginator's page event
    if ($event.previousPageIndex) {
      $event.previousPageIndex > $event.pageIndex ? this.p-- : this.p++;
    } else {
      this.p++;
    }

    // Set the new target page index in the pagination service
    this.paginationService.setTargetPageIndex(this.p);

    // Fetch data for the new page
    this.handleRequest(this.p);
  }

  /**
   * Requests the list of persons from the API.
   * @param page Optional parameter for the page number to fetch.
   */
  private handleRequest(page?: number) {
    this.postService.getPosts(page).subscribe({
      next: (response: PersonListViewModel) => {
        if (isPersonListViewModel(response)) {
          // Update the person list if the response is valid
          this.personList = response;
        }

        // Show empty state message if no data is available
        this.showEmpty = !this.personList;
        this.paginatorDisabled = false; // Re-enable the paginator
      },
      error: (err) => {
        // Handle errors gracefully
        console.error('Failed to load data', err);

        // Reset the person list and show empty state
        this.personList = undefined;
        this.showEmpty = true;
        this.paginatorDisabled = false; // Re-enable the paginator
      },
    });
  }
}
