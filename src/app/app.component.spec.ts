import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { NotFoundMessageComponent } from './components/not-found-message/not-found-message.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { StarsBackgroundComponent } from './components/stars-background/stars-background.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PersonDetailsComponent,
        PersonListComponent,
        NotFoundMessageComponent,
        StarsBackgroundComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterOutlet,
        RouterTestingModule,
        RouterModule,
        MatCardModule,
        MatListModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        MatExpansionModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'The Star Wars library'
    );
  });
});
