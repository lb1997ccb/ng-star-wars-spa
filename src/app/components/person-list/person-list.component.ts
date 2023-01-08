import { Component, Input, OnInit } from '@angular/core';
import { isPersonListViewModel, PersonListViewModel } from './types';
import { PostService } from '../../services/post/post.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass'],
})
export class PersonListComponent implements OnInit {
  @Input()
  personList?: PersonListViewModel;

  p = 1;

  pageSize = 10;

  paginatorIndex: number;

  paginatorDisabled = false;

  showEmpty = false;

  constructor(
    private readonly postService: PostService,
    private readonly paginationService: PaginationService
  ) {
    this.p = this.paginationService.getTargetPageIndex();
    this.paginatorIndex = this.p - 1;
  }

  ngOnInit() {
    this.handleRequest(this.p);
  }

  handlePageEvent($event: PageEvent) {
    this.paginatorDisabled = true;
    if ($event.previousPageIndex) {
      $event.previousPageIndex > $event.pageIndex ? this.p-- : this.p++;
    } else {
      this.p++;
    }
    this.paginationService.setTargetPageIndex(this.p);
    this.handleRequest(this.p);
  }

  private handleRequest(page?: number) {
    this.postService
      .getPosts(page)
      .subscribe((response: PersonListViewModel) => {
        if (isPersonListViewModel(response)) {
          this.personList = response;
        }
        this.showEmpty = !this.personList;
        this.paginatorDisabled = false;
      });
  }
}
