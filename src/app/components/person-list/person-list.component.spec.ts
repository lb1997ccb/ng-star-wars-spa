import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { PersonListComponent } from './person-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PostService } from '../../services/post/post.service';
import { of } from 'rxjs';
import { personListMock } from './mocks/person-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundMessageComponent } from '../not-found-message/not-found-message.component';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent, NotFoundMessageComponent],
      imports: [
        HttpClientModule,
        MatProgressBarModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterLink,
      ],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a list with 10 items', fakeAsync(async () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPosts').and.returnValue(of(personListMock));

    await component.ngOnInit();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.personList).toBeDefined();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.getElementsByClassName('list-group-item');
    expect(items.length).toBe(10);
  }));

  it('should display data not found message', fakeAsync(async () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPosts').and.returnValue(of(undefined));

    await component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-not-found-message')).not.toBeNull();
  }));
});
