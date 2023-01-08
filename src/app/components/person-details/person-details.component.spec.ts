import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { PersonDetailsComponent } from './person-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotFoundMessageComponent } from '../not-found-message/not-found-message.component';
import { personDetailsMock } from './mocks/person-details';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('PersonDetailsComponent', () => {
  let component: PersonDetailsComponent;
  let fixture: ComponentFixture<PersonDetailsComponent>;
  const mockActivatedRoute = {
    queryParams: of({ id: '1' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDetailsComponent, NotFoundMessageComponent],
      imports: [
        MatProgressBarModule,
        HttpClientTestingModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create card with person details and check for title', fakeAsync(async () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPersonDetails').and.returnValue(
      of(personDetailsMock)
    );

    await component.ngOnInit();
    expect(component.person).toBeDefined();
    expect(postService.getPersonDetails).toHaveBeenCalled();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.mat-mdc-card-title')?.textContent
    ).toContain('Luke Skywalker');
  }));

  it('should display data not found message', fakeAsync(async () => {
    component.person = undefined;
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPersonDetails').and.returnValue(of({}));

    await component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-not-found-message')).not.toBeNull();
  }));
});
