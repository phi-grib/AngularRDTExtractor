import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterContentInit ,AfterViewInit,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { Router } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Plot } from '../plot';




@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, AfterViewInit {

  plots:Array<Plot>;


  plotID:number;
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

  constructor( private findService : FindingsService,  private _router: Router ) { }

  ngOnInit(){

    this.plots=[]
    this.plotID=1;
    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = [350, 450, 100]
    a.labels =  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
    a.chartType = 'line'

    this.plots.push(a)

    var b = new Plot();
    b.id=this.plotID;
    this.plotID++;
    b.data = [350, 450, 100, 45, 1259, 12, 856, 150]
    b.labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    b.chartType = 'pie'
    
    this.plots.push(b)
   
    console.log(this.plots);
   
  }

   ngAfterViewInit() {

    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable);
    this.findService.currentAxis.subscribe(info=>{
      console.log(info);
    });
   

  }

 
  onDragged( item:any, list:any[] ) { 
    //const index = list.indexOf( item );
    //list.splice( index, 1 );
  }

  onDrop( event:DndDropEvent, list:any[] ) {
    /*let index = event.index;
    if( typeof index === "undefined" ) {
      index = list.length;
    }

    list.splice( index, 0, event.data );*/
  }
}

