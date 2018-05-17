import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PanelComponent } from './panel/panel.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { FindingsService } from './findings.service';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './/app-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { ExploreComponent } from './explore/explore.component';
import { ConnectComponent } from './connect/connect.component';
import { BrowseComponent } from './browse/browse.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    PanelComponent,
    CapitalizePipe,
    TableComponent,
    TabsComponent,
    ExploreComponent,
    ConnectComponent,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    AppRoutingModule,
    IonRangeSliderModule
  ],
  providers: [FindingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
