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
  plot_info={}


  plotID:number;
  search_form = {};
  categories_search_form = {};
  firstTime=true;
 
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

    this.findService.currentTable.subscribe(table_info =>{
      this.plot_info = table_info['plotInfo']
      if (!this.firstTime){
        this.plots['Studies'].labels = ['Selected', 'NO Selected']
        this.plots['Structures'].labels = ['Selected', 'NO Selected']
        this.plots['Findings'].labels =  ['Selected', 'NO Selected']
        this.plots['Species'].labels = this.plot_info['normalised_species'][0]
        this.plots['Treatment'].labels = this.plot_info['relevance'][0]
        this.plots['Source'].labels = this.plot_info['source'][0]
        setTimeout(() => {
          this.plots['Studies'].data=[this.globals.totalStudies - table_info['num_studies'],table_info['num_studies']]
          this.plots['Structures'].data=[this.globals.totalStructures - table_info['num_structures'],table_info['num_structures']]
          this.plots['Findings'].data=[this.globals.totalFindings - table_info['num_findings'],table_info['num_findings']]
          this.plots['Species'].data=this.plot_info['normalised_species'][1]
          this.plots['Treatment'].data = this.plot_info['relevance'][1]
          this.plots['Source'].data = this.plot_info['source'][1]
        }, 50); 
      }
      this.firstTime=false
    });

    this.plots=[]
    this.plotID=1;
    
    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = [this.globals.totalStructures,0]
    a.labels =  ['Selected', 'NO Selected']
    a.chartType = 'pie'
    a.title= "Structures"
    this.plots['Structures']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = [this.globals.totalStudies, 0]
    a.labels = ['Selected', 'NO Selected']
    a.chartType = 'pie'
    a.title= "Studies"
    this.plots['Studies']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = [this.globals.totalFindings, 0]
    a.labels = ['Selected', 'NO Selected']
    a.chartType = 'pie'
    a.title= "Findings"
    this.plots['Findings']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = this.plot_info['normalised_species'][1]
    a.labels = this.plot_info['normalised_species'][0]
    a.chartType = 'pie'
    a.title= "Species"
    this.plots['Species']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = this.plot_info['relevance'][1]
    a.labels = this.plot_info['relevance'][0]
    a.title= "Treatment related"
    a.chartType = 'pie'
    this.plots['Treatment']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.data = this.plot_info['source'][1]
    a.labels = this.plot_info['source'][0]
    a.title= "Source"
    a.chartType = 'pie'
    this.plots['Source']=a


   
  }

   ngAfterViewInit() {
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable);
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

