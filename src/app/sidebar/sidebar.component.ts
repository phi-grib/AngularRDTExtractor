import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { TreeviewItem, TreeviewEventParser, DownlineTreeviewEventParser} from 'ngx-treeview';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    { provide: TreeviewEventParser, useClass: DownlineTreeviewEventParser }
  ]
})

export class SidebarComponent implements OnInit {

  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;
  @ViewChild('organs') organs: TreeviewItem[];

  relevant_form: boolean;
  F: boolean=false;
  M: boolean=false;
  BOTH: boolean=false;
  sex = [];
  sources = [];
  selectedCategory: string;
  hasCategory: boolean=false;
  firstTimeSearch:boolean=false;
  firstTimeCategorySearch:boolean=false;
  request:any;

  objectKeys = Object.keys;
  search_form = <any>{};
  categories_search_form = <any>{};
  table_info = <any>{};
  router;

  // Set this value on init to store the total number of studies and structures
  // so that we can calculate the current fraction selected
  totalStudies: number;
  totalStructures: number;
  totalFindings: number;
  // Store global minimum and maximum exposure values
  minExposure: number;
  maxExposure: number;

  categoryOptionsSelected ={};
  categoryOptions = {}

  errorMsg:string;

  config_select = {
    search: true,
    height: '300px',
    placeholder: 'select'
  };

  constructor(private httpClient: HttpClient, 
              private modalDialogService: ModalDialogService, 
              private viewContainer: ViewContainerRef,
              private findService : FindingsService,
              private _router: Router,
              public globals: Globals) {
    this.router = _router;
  }

  ngOnInit(){

    this.globals.showSpinner = true;
    this.globals.showError = false;
    this.findService.currentTable.subscribe(table_info =>this.table_info = table_info);

    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.globals.showError = false;
      this.categories_search_form = categoriesSearchForm;
      if (this.firstTimeCategorySearch){
        if (this.request){
            this.request.unsubscribe();
        }
        /*Case TABLE*/
        this.globals.showSpinner = true;
        this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(
          (data) => {  
          this.findService.changeTable(data);
          for (let source of this.sources){ 
            this.categoryOptions[source]['parameters']=data['allOptions']['parameters'][source]
            this.categoryOptions[source]['observations']=data['allOptions']['observations'][source]
            this.categoryOptionsSelected[source]['parameters'] =  this.categories_search_form[source]['parameters']
            this.categoryOptionsSelected[source]['observations'] =   this.categories_search_form[source]['observations']
          }
          this.globals.showSpinner = false;
        },(error)=>{
          this.globals.errorMsg=error.message;
          this.globals.showError = true;
      });
 
      }
      this.firstTimeCategorySearch=true;   
    });

    this.findService.currentSearchFormTable.subscribe (searchFormTable =>{
      this.globals.showError = false;
      this.search_form = searchFormTable;
      if (this.firstTimeSearch){
        if (this.request){
            this.request.unsubscribe();
        }
      
        this.globals.showSpinner = true;
        this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(
          (data)=> { 
            for (let source of this.sources){ 
              this.categoryOptions[source]['parameters']=data['allOptions']['parameters'][source]
              this.categoryOptions[source]['observations']=data['allOptions']['observations'][source]
            }
            this.findService.changeTable(data); 
            this.globals.showSpinner = false;
          },(error)=>{
            this.globals.errorMsg=error.message;
            this.globals.showError = true;
        });
  
      }
      this.firstTimeSearch=true;
      },
      error=>{
        this.errorMsg=error
        alert(this.errorMsg);
      }
    );

    /*FIRST time*/
    this.findService.initFinding().subscribe(table_info => {
     
      this.totalStructures = table_info['num_structures'];
      this.totalStudies = table_info['num_studies'];
      this.totalFindings = table_info['num_findings'];
      
      this.globals.totalStructures = table_info['num_structures']
      this.globals.totalStudies = table_info['num_studies'];
      this.globals.totalFindings = table_info['num_findings'];

      this.minExposure = table_info['allOptions']['exposure_min'];
      this.maxExposure = table_info['allOptions']['exposure_max'];
    
      this.sex = table_info['allOptions']['sex'];
      this.sources = table_info['allOptions']['sources'];
      for (let source of this.sources){ 

        this.selectedCategory=source
        this.categories_search_form[source] = {}
        this.categories_search_form[source]['parameters']=[]
        this.categories_search_form[source]['observations']=[]
        
        this.categoryOptions[source] = {}
        this.categoryOptions[source]['parameters']=table_info['allOptions']['parameters'][source]
        this.categoryOptions[source]['observations']=table_info['allOptions']['observations'][source]

        this.categoryOptionsSelected[source] = {}
        this.categoryOptionsSelected[source]['parameters']=[]
        this.categoryOptionsSelected[source]['observations']=[]
      }
      this.findService.changeTable(table_info);
      this.findService.changePlot(table_info);
      this.globals.showSpinner = false;
    });
  }

  selectCategory(event: any){
    this.hasCategory = true;
    this.selectedCategory = event.target.value;

    if (!(event.target.value in this.categories_search_form)) {
      this.categories_search_form[event.target.value] = null;
    }
  }

  isCategoryFiltered(category: string){
    if (category in this.categories_search_form){
      if (this.categories_search_form[category] == undefined) {
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }

  addSearchSelect(event: any){
      // If the key(field of search) is already inserted   
      if (event.target.id in this.search_form){
        // If the value(name to search) is already inserted
        if (this.search_form[event.target.id].indexOf(event.target.value)==-1){   
          this.search_form[event.target.id].push(event.target.value);
        }
      }
      else{
        this.search_form[event.target.id]=[event.target.value];
      }
      this.findService.changeSearchFormTable(this.search_form);
  }

  addSearchCheckBox(event: any,id:string){

    if (this.sex.indexOf(event.target.value)!=-1){  
      if (event.target.checked){
        if (event.target.value=="F"){
          this.M=false;
          this.BOTH=false;
        }
        else if (event.target.value=="M"){
          this.F=false;
          this.BOTH=false;
        }
        else{
          this.M=false;
          this.F=false;
        }
      }
    }
    if (event.target.checked){   
      this.search_form[id]=[event.target.value];   
    }
    else{   
      delete this.search_form[id];
    }
    this.findService.changeSearchFormTable(this.search_form);
  }

  addSliderInfo($event){
    this.search_form['min_exposure']=$event.from;
    this.search_form['max_exposure']=$event.to;
    this.findService.changeSearchFormTable(this.search_form);
  }

  resetFilters(){    
    this.search_form={}
    for (let source of this.sources){  
      this.categories_search_form[source]=[];
      this.categories_search_form[source]=[];
    }
    this.relevant_form = false;
    this.BOTH = false;
    this.F = false;
    this.M = false;
    this.sliderElement.reset();
    this.hasCategory = false;
    this.findService.changeCategoriesSearchForm(this.categories_search_form);
    this.findService.changeSearchFormTable(this.search_form);
  }

  addCategory($event: any, type){
    this.categories_search_form[this.selectedCategory][type] = $event.value;
    this.findService.changeCategoriesSearchForm(this.categories_search_form);
  }

  addSearchForm($event: any, type){
    this.search_form[type] = $event.value;
    this.findService.changeSearchFormTable(this.search_form);
  }

  tof(x: any) {
    var count = 0;
    for(var i in x){
      count++;
    }
    return count;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflow = "hidden";
    document.getElementById("main").style.marginLeft = "25px";document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.width = "100%";
  }
}
