import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterContentInit ,AfterViewInit,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { Router } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements AfterViewInit {
 
  
  router;
  charts = [
    {id: 'line', name: "Line"},
    {id: 'pie', name: "Pie"},
    {id: 'doughnut', name: "Doughnut"},
    {id: 'horizontalBar', name: "Horizontal Bar"},
    {id: 'bar', name: "Verical Bar"}
  ];
  chartType:string = 'line';

  xAxis:Array<any>[];
  yAxis:Array<any>[];

  // lineChart
  chartData:string[]; 
  chartLabels: number[];

  options: {
    responsive: true
  }
 
  search_form = {};
  categories_search_form = {};
  firstTime=false;
 
  public fruits:string[] = [
    "Molecules",
    "Studies",
    "Species",
    "Routes",
    "Sources",
    "Pharmacological action",
    "Category",
    "Sex",
    "Treatment Related",
    "Organs",
    "Observations"
  ];

  public apples:string[] = [
    "apple",
    "apple"
  ];

  public bananas:string[] = [
    "banana",
    "banana"
  ];

  o
  constructor( private findService : FindingsService,  private _router: Router ) { }

   ngAfterViewInit() {

    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable);
    this.findService.currentAxis.subscribe(info=>{
      console.log(info);
      this.chartLabels=info[0];
        setTimeout(() => {
          this.chartData=info[1];
        }, 50);  
    });
  }

 
  onDragged( item:any, list:any[] ) {
    console.log("---nDragged-----");
    console.log(item);
    console.log(list);
    const index = list.indexOf( item );
    list.splice( index, 1 );
    console.log(list);
    console.log("#####nDragged####");
  }

  onDrop( event:DndDropEvent, list:any[] ) {
    console.log("---OnDrop-----");
    console.log(event.data);
    console.log(list);
    let index = event.index;

    if( typeof index === "undefined" ) {

      index = list.length;
    }

    list.splice( index, 0, event.data );
    console.log(list);
    console.log("#####OnDrop####");
  }
}

