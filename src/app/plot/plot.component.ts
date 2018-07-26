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
import { Globals } from '../globals';




@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, AfterViewInit {

  objectKeys = Object.keys;
  plots:{};
  table_info={}


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

  constructor( private findService : FindingsService,  private _router: Router,
    private globals: Globals ) { }

  ngOnInit(){

    this.plots=[]
    this.plotID=1;
    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = [this.globals.totalStructures,0]
    a.labels =  ['Total Structures', 'Structures Selected']
    a.chartType = 'pie'

    this.plots['structures']=a

    var b = new Plot();
    b.id=this.plotID;
    this.plotID++;
    b.data = [this.globals.totalStudies, 0]
    b.labels = ['Total Studies', 'Studies Selected']
    b.chartType = 'pie'
    
    this.plots['studies']=b

   
  }

   ngAfterViewInit() {
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable);
    this.findService.currentTable.subscribe(table_info =>{
      this.table_info = table_info
      this.plots['studies'].labels=['Total Studies', 'Studies Selected']
      this.plots['structures'].labels=['Total Structures', 'Structures Selected']
      setTimeout(() => {
        this.plots['studies'].data=[this.globals.totalStudies - table_info['num_studies'],table_info['num_studies']]
        this.plots['structures'].data=[this.globals.totalStructures - table_info['num_structures'],table_info['num_structures']]

        console.log(this.plots)
      }, 50); 
      
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

