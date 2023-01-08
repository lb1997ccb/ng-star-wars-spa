import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import {
  isDetailsViewModel,
  PersonDetailsResult,
  PersonDetailsViewModel,
  PlanetDetailsResult,
  PlanetDetailsViewModel,
} from './types';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.sass'],
})
export class PersonDetailsComponent implements OnInit {
  @Input()
  person?: PersonDetailsViewModel;

  @Input()
  planet?: PlanetDetailsViewModel;

  showEmpty = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.postService
        .getPersonDetails(params['id'])
        .subscribe((response: PersonDetailsResult) => {
          if (isDetailsViewModel(response.result)) {
            this.person = response.result;
          }
          this.showEmpty = !this.person;
          this.person && this.setPlanetDetails(this.person);
        });
    });
  }

  private setPlanetDetails(person: PersonDetailsViewModel): void {
    person.properties &&
      this.postService
        .getPlanetDetails(person.properties.homeworld)
        .subscribe((response: PlanetDetailsResult) => {
          if (isDetailsViewModel(response.result)) {
            this.planet = response.result;
          }
        });
  }
}
