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
  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  constructor( private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentSearchFormTable.subscribe (searchFormTable => {
      this.search_form = searchFormTable;
      this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
        this.basicChart(info['x'],info['y']);
        this.basicChart2(info['x'],info['y']);
      });
    });
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.categories_search_form = categoriesSearchForm;
      this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          
        this.basicChart(info['x'],info['y']);
        this.basicChart2(info['x'],info['y']);
      });
    });
    
    this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
          
      this.basicChart(info['x'],info['y']);
      this.basicChart2(info['x'],info['y']);
    });
    
  }


  basicChart(x,y) {

    const element = this.el.nativeElement

    const data = [{
      labels: x,
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 500
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

  

  
  
  onDragStart(event:DragEvent) {

    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
      
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
  onDraggableMoved(event:DragEvent) {
    
    console.log("draggable moved", JSON.stringify(event, null, 2));
  }
      
  onDragCanceled(event:DragEvent) {
    
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop(event:DndDropEvent) {
  
    console.log("dropped", JSON.stringify(event, null, 2));
  }

}
