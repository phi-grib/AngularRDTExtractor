
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableComponent } from './table/table.component';
import { PlotComponent } from './plot/plot.component';
import { PanelComponent } from './panel/panel.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FindingsService } from './findings.service';
import { AppRoutingModule } from './app-routing.module';
import { ExploreComponent } from './explore/explore.component';
import { ConnectComponent } from './connect/connect.component';
import { BrowseComponent } from './browse/browse.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CustomModalComponent } from './dialog/dialog.component';
import { TreeviewModule } from 'ngx-treeview';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
import { DndModule } from 'ngx-drag-drop';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MonoPlotComponent } from './mono-plot/mono-plot.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { Globals } from './globals'
import {TooltipModule} from "ngx-tooltip";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FilterInfoComponent } from './filter-info/filter-info.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TabsComponent,
    TableComponent,
    PlotComponent,
    PanelComponent,
    LoadingSpinnerComponent,
    CapitalizePipe,
    ExploreComponent,
    ConnectComponent,
    BrowseComponent,
    CustomModalComponent,
    DisabledOnSelectorDirective,
    MonoPlotComponent,
    FilterInfoComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalDialogModule.forRoot(),
    TooltipModule,
    TreeviewModule.forRoot(),
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    DndModule,
    ChartsModule,
    SelectDropDownModule,
    TooltipModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [FindingsService,Globals],
  entryComponents: [CustomModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
