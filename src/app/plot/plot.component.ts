import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FindingsService } from '../findings.service';
import { Router } from '@angular/router';
import { Plot } from '../plot';
import { Globals } from '../globals';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})

export class PlotComponent implements OnInit, AfterViewInit {

  objectKeys = Object.keys;
  plots: {};
  plot_info = <any>{}
  num_studies: number=0
  num_structures: number=0
  num_findings: number=0

  plotID: number;
  search_form = {};
  categories_search_form = {};
  firstTime = true;

  colors:Array<any> =
  [ "#89BDAB",
    "#E3464A",
    "#F0EDDB",
    "#216F78",
    "#E8C098",
    "#BFB6B3",
    "#E8A631",
    "#49C4D1",
    "#9A794C",
    "#253741",
    "#A11E22",
    "#FAAC77",
    "#C9C980",
    "#F8EFEE",
    "#60686F",
    "#333C3E"
  ];

  constructor( private findService : FindingsService,  private _router: Router,
    public globals: Globals,public spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit(){

    this.findService.currentTable.subscribe(table_info =>{
      this.plot_info = table_info
     
      if (!this.firstTime){
        this.plots['Studies'].labels = ['Selected Positive','Selected Negative','Not Selected'];
        this.plots['Structures'].labels = ['Selected Positive','Selected Negative','Not Selected'];
        this.plots['Findings'].labels =  ['Selected Positive','Selected Negative','Not Selected'];
        this.plots['Species'].labels = this.plot_info['plotInfo']['species'][0];
        this.plots['Treatment'].labels = ['Not related', 'Treatment related'];
        this.plots['Source'].labels = this.plot_info['plotInfo']['source'][0];
        setTimeout(() => {
          this.plots['Studies'].datasets = [
            {
              data: [this.plot_info['num_studies_positives'], this.plot_info['num_studies_negatives'], this.globals.totalStudies - this.plot_info['num_studies_positives'] - this.plot_info['num_studies_negatives']],
              backgroundColor: this.colors.slice(0,3)
            }];
            
            
          this.plots['Structures'].datasets = [
            {
              data: [this.plot_info['num_structures_positives'],this.plot_info['num_structures_negatives'], this.globals.totalStructures - this.plot_info['num_structures_positives'] - this.plot_info['num_structures_negatives']],
              backgroundColor: this.colors.slice(0,3)
            }];
          this.plots['Findings'].datasets= [
            {
              data: [this.plot_info['num_findings_positives'],this.plot_info['num_findings_negatives'] ,this.globals.totalFindings - this.plot_info['num_findings_positives'] -this.plot_info['num_findings_negatives']],
              backgroundColor: this.colors.slice(0,3)
            }];    
          this.plots['Species'].datasets = [
            {
              data: this.plot_info['plotInfo']['species'][1],
              backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['species'][1].length)
            }];
         
          this.plots['Treatment'].datasets = [
            {
              data: this.plot_info['plotInfo']['relevance'][1],
              backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['relevance'][1].length)
            }];
         
          this.plots['Source'].datasets = [
            {
              data: this.plot_info['plotInfo']['source'][1],
              backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['source'][1].length)
            }];     
        }, 50);
        
        this.spinnerService.hide();
      }
      this.firstTime=false
    });
   
    this.plots=[]
    this.plotID=1;

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: [this.plot_info['num_structures'],0, this.globals.totalStructures - this.plot_info['num_structures']],
        backgroundColor: this.colors.slice(0,3)
      }];
    a.labels =  ['Selected Positive','Selected Negative','Not Selected'];
    a.chartType = 'pie'
    a.title= "Structures"
    this.plots['Structures']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: [this.plot_info['num_studies'],0, this.globals.totalStudies - this.plot_info['num_studies']],
        backgroundColor: this.colors.slice(0,3)
      }];
    a.labels = ['Selected Positive','Selected Negative','Not Selected'];
    a.chartType = 'pie'
    a.title= "Studies"
    this.plots['Studies']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: [this.plot_info['num_findings'],0,this.globals.totalFindings - this.plot_info['num_findings']],
        backgroundColor: this.colors.slice(0,3)
      }];
    a.labels = ['Selected Positive','Selected Negative','Not Selected'];
    a.chartType = 'pie'
    a.title= "Findings"
    this.plots['Findings']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: this.plot_info['plotInfo']['species'][1],
        backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['species'][1].length)
      }];
    a.labels = this.plot_info['plotInfo']['species'][0]
    a.chartType = 'pie'
    a.title= "Species"
    this.plots['Species']=a
    
    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: this.plot_info['plotInfo']['relevance'][1],
        backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['relevance'][1].length)
      }];
    a.labels = this.plot_info['plotInfo']['relevance'][0]
    a.title= "Relevance"
    a.chartType = 'pie'
    this.plots['Treatment']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.datasets= [
      {
        data: this.plot_info['plotInfo']['source'][1],
        backgroundColor: this.colors.slice(0,this.plot_info['plotInfo']['source'][1].length)
      }];
    a.labels = this.plot_info['plotInfo']['source'][0]
    a.title= "Source"
    a.chartType = 'pie'
    this.plots['Source']=a
  }

   ngAfterViewInit() {
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable); 
  }

  closeError(){
    this._router.navigate(['']);
  }
}

