import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterContentInit ,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { Router } from '@angular/router';




@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements AfterContentInit {
 

  router;
  // lineChart
  lineChartData:string[]; 
  lineChartLabels: number[];
  lineChartType:string = 'line';
  
 
  // Pie
  pieChartLabels:string[]; 
  pieChartData:number[];
  pieChartType:string = 'pie';
  options: {
    responsive: true
  }
 
  search_form = {};
  categories_search_form = {};
 
  public fruits:string[] = [
    "apple",
    "apple",
    "banana",
    "apple",
    "banana",
    "banana",
    "apple",
    "banana",
    "apple",
  ];

  public apples:string[] = [
    "apple",
    "apple"
  ];

  public bananas:string[] = [
    "banana",
    "banana"
  ];


  constructor( private findService : FindingsService,  private _router: Router ) {

    this.router = _router;

   }

  ngAfterContentInit() {
    this.findService.currentSearchFormTable.subscribe (searchFormTable => {
      this.search_form = searchFormTable;
      if(this.router.url=="/plot") {
        this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          this.pieChartLabels=info['x'];
          this.lineChartLabels=info['x'];
          setTimeout(() => {
            this.pieChartData=info['y'];
            this.lineChartData=info['y'];
          }, 50);
        });
      }
    });
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.categories_search_form = categoriesSearchForm;
      if(this.router.url=="/plot") {
        this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          this.pieChartLabels=info['x'];
          this.lineChartLabels=info['x']; 
          setTimeout(() => {
            this.pieChartData=info['y'];
            this.lineChartData=info['y'];
          }, 50);    
        });
      }
    });
    
    this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
      this.pieChartLabels=info['x'];
      this.pieChartData=info['y']; 
      this.lineChartLabels=info['x']; 
      this.lineChartData=info['y'];     
    });
    
  }
 
  onDragged( item:any, list:any[] ) {

    const index = list.indexOf( item );
    list.splice( index, 1 );
  }

  onDrop( event:DndDropEvent, list:any[] ) {

    let index = event.index;

    if( typeof index === "undefined" ) {

      index = list.length;
    }

    list.splice( index, 0, event.data );
}

  
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
