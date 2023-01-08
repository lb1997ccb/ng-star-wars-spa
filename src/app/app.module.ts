import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonListComponent } from './components/person-list/person-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { NotFoundMessageComponent } from './components/not-found-message/not-found-message.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StarsBackgroundComponent } from './components/stars-background/stars-background.component';

@NgModule({
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
