import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTileComponent } from './basic-tile/basic-tile.component';
import { MainGridComponent } from './main-grid/main-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicTileComponent,
    MainGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
