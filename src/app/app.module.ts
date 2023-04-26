import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTileComponent } from './basic-tile/basic-tile.component';
import { MainGridComponent } from './main-grid/main-grid.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicTileComponent,
    MainGridComponent,
    ContextMenuComponent,
    ActionMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
