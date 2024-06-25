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
  @Input() person?: PersonDetailsViewModel; // Detailed information about the person
  @Input() planet?: PlanetDetailsViewModel; // Detailed information about the person's homeworld

  showEmpty = false; // Indicates whether to show an empty state message

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService
  ) {}

  ngOnInit() {
    // Subscribe to query params to get person ID from the route
    this.route.queryParams.subscribe((params) => {
      // Fetch person details based on ID from the route params
      this.postService
        .getPersonDetails(params['id'])
        .subscribe((response: PersonDetailsResult) => {
          if (isDetailsViewModel(response.result)) {
            // Update person details if response is valid
            this.person = response.result;
          }
          this.showEmpty = !this.person; // Show empty state if person details are not available
          this.person && this.setPlanetDetails(this.person); // Fetch planet details if person details are available
        });
    });
  }

  /**
   * Fetches and sets details about the planet from which the person originates.
   * @param person The detailed information about the person including homeworld URL.
   */
  private setPlanetDetails(person: PersonDetailsViewModel): void {
    // Ensure properties exist before fetching planet details
    person.properties &&
      this.postService
        .getPlanetDetails(person.properties.homeworld)
        .subscribe((response: PlanetDetailsResult) => {
          if (isDetailsViewModel(response.result)) {
            // Update planet details if response is valid
            this.planet = response.result;
          }
        });
  }
}
