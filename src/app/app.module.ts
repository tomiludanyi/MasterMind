import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PegComponent } from './peg/peg.component';
import { GameOverComponent } from './game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    PegComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
