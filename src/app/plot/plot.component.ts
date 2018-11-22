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
    public globals: Globals,public spinnerService: Ng4LoadingSpinnerService) { 

    this.plots=[]
    this.plotID=1;

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.chartType = 'pie'
    a.title= "Structures"
    this.plots['Structures']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.chartType = 'pie'
    a.title= "Studies"
    this.plots['Studies']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.chartType = 'pie'
    a.title= "Findings"
    this.plots['Findings']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.chartType = 'pie'
    a.title= "Species"
    this.plots['Species']=a
    
    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.title= "Relevance"
    a.chartType = 'pie'
    this.plots['Treatment']=a

    var a = new Plot();
    a.id=this.plotID;
    this.plotID++;
    a.title= "Source"
    a.chartType = 'pie'
    this.plots['Source']=a

    }

  ngOnInit(){

    this.findService.currentTable.subscribe(table_info =>{
      this.plot_info = table_info
      if (true){
        // Exist some negative finding, structure, study
        if (this.plot_info['num_findings_negatives']==0){
          var data_studies = [this.plot_info['num_studies_positives'], this.globals.totalStudies - this.plot_info['num_studies_positives']]
          var data_structures = [this.plot_info['num_structures_positives'], this.globals.totalStructures - this.plot_info['num_structures_positives']]
          var data_findings = [this.plot_info['num_findings_positives'], this.globals.totalFindings - this.plot_info['num_findings_positives']]
          var label_studies = ['Selected ','Not Selected'];
          var label_structures = ['Selected ','Not Selected'];
          var label_indings = ['Selected ','Not Selected'];
        }
        else{
          var data_studies = [this.plot_info['num_studies_positives'], this.plot_info['num_studies_negatives'], this.globals.totalStudies - this.plot_info['num_studies_positives'] - this.plot_info['num_studies_negatives']]
          var data_structures = [this.plot_info['num_structures_positives'],this.plot_info['num_structures_negatives'], this.globals.totalStructures - this.plot_info['num_structures_positives'] - this.plot_info['num_structures_negatives']]
          var data_findings = [this.plot_info['num_findings_positives'],this.plot_info['num_findings_negatives'] ,this.globals.totalFindings - this.plot_info['num_findings_positives'] -this.plot_info['num_findings_negatives']]
          var label_studies = ['Selected Positive','Selected Negative','Not Selected'];
          var label_structures = ['Selected Positive','Selected Negative','Not Selected'];
          var label_indings = ['Selected Positive','Selected Negative','Not Selected'];
        }


        this.plots['Studies'].labels = label_studies
        this.plots['Structures'].labels = label_structures
        this.plots['Findings'].labels =  label_indings
        this.plots['Species'].labels = this.plot_info['plotInfo']['species'][0];
        this.plots['Treatment'].labels = ['Not related', 'Treatment related'];
        this.plots['Source'].labels = this.plot_info['plotInfo']['source'][0];

        
        setTimeout(() => {
          this.plots['Studies'].datasets = [
            {
              data: data_studies,
              backgroundColor: this.colors.slice(0,data_studies.length)
            }];
            
            
          this.plots['Structures'].datasets = [
            {
              data: data_structures,
              backgroundColor: this.colors.slice(0,data_structures.length)
            }];
          this.plots['Findings'].datasets= [
            {
              data: data_findings,
              backgroundColor: this.colors.slice(0,data_findings.length)
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
  
  }

   ngAfterViewInit() {
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);
    this.findService.currentSearchFormTable.subscribe (searchFormTable =>this.search_form = searchFormTable); 
  }

  closeError(){
    this._router.navigate(['']);
  }
}

