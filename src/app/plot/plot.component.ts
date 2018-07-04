import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterContentInit ,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";




@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements AfterContentInit {
 

  // lineChart
  lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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
  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  constructor( private findService : FindingsService) { }

  ngAfterContentInit() {
    this.findService.currentSearchFormTable.subscribe (searchFormTable => {
      this.search_form = searchFormTable;
      this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
        this.pieChartLabels=info['x'];
        setTimeout(() => {
          this.pieChartData=info['y'];
        }, 50);
      });
    });
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.categories_search_form = categoriesSearchForm;
      this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
        this.pieChartLabels=info['x'];
        this.pieChartData=info['y'];     
      });
    });
    
    this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
      this.pieChartLabels=info['x'];
      this.pieChartData=info['y'];     
    });
    
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
