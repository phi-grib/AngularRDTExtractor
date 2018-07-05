import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterViewInit ,ViewContainerRef, Renderer2} from '@angular/core';
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
export class PlotComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;
  @ViewChild('chart2') el2: ElementRef;
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


  constructor( private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentSearchFormTable.subscribe (searchFormTable => {
      this.search_form = searchFormTable;
     // this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
        //this.basicChart(info['x'],info['y']);
       // this.basicChart2(info['x'],info['y']);
     // });
    });
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.categories_search_form = categoriesSearchForm;
     // this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          
        //this.basicChart(info['x'],info['y']);
        //this.basicChart2(info['x'],info['y']);
     // });
    });
    
   // this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          
      //this.basicChart(info['x'],info['y']);
      //this.basicChart2(info['x'],info['y']);
    //});
    
  }


  basicChart(x,y) {

    const element = this.el.nativeElement

    const data = [{
      labels: x,
      type: 'pie'
    }];

    var layout = {
      height: 800,
      width: 1000
    };

    Plotly.newPlot( element,data, layout )
  }

  basicChart2(x,y){

    const element = this.el2.nativeElement

    var trace = [{
      type: 'histogram',
      x: x,
    }]
    var layout = {
      height: 400,
      width: 500
    };
    var data = [trace];

  Plotly.plot( element,data , layout)
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

}
