import { Component, OnInit, ViewChild } from '@angular/core';
import { FindingsService } from '../findings.service';
import { TreeviewItem, TreeviewEventParser, DownlineTreeviewEventParser} from 'ngx-treeview';
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

  @ViewChild('organs') organs: TreeviewItem[];

  relevant_form: boolean;
  F: boolean=false;
  M: boolean=false;
  BOTH: boolean=false;
  treatmentRelated: boolean=false;
  sex = [];
  sources = [];
  selectedCategory: string;
  hasCategory: boolean=false;
  doseDisabled: boolean=true;
  firstTimeSearch: boolean=false;
  firstTimeCategorySearch: boolean=false;
  request: any;

  objectKeys = Object.keys;
  search_form = <any>{};
  categories_search_form = <any>{};
  table_info = <any>{};
  files : any;
  router;

  // Set this value on init to store the total number of studies and structures
  // so that we can calculate the current fraction selected
  totalStudies: number;
  totalStructures: number;
  totalFindings: number;
  // Store global minimum and maximum exposure values
  minExposure: number;
  maxExposure: number;
  fromValue: number=null;
  toValue: number=null;
  // Store global minimum and maximum dose values
  minDose: number;
  maxDose: number;
  minDoseValue: number=null;
  maxDoseValue: number=null;
  negMinDose: number=null;

  categoryOptionsSelected ={};
  categoryOptions = {};

  errorMsg: string;

  config_select = {
    search: true,
    height: '300px',
    placeholder: 'select'
  };

  constructor(private findService : FindingsService, public globals: Globals) {}

  ngOnInit() {

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
        /* If nothing to serach*/
        if (!this.somethingtoSearch()) {
          this.request = this.findService.initFinding().subscribe(table_info => {
            this.findService.changeTable(table_info);
            this.findService.changePlot(table_info);
            this.globals.showSpinner = false;
          });
        }
        else {
          this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(
            (data) => {  
              this.findService.changeTable(data);
              this.globals.showSpinner = false;
            },(error)=>{
              this.globals.errorMsg=error.message;
              this.globals.showError = true;
          });
        }
      }
      this.firstTimeCategorySearch=true;   
    });

    this.findService.currentSearchFormTable.subscribe (searchFormTable =>{
      if (!("sex" in this.search_form)){
        this.F=false
        this.M=false
        this.BOTH=false
      }
      if (!("treatmentRelated" in this.search_form)){
        this.treatmentRelated=false
      }
      
      this.globals.showError = false;
      this.search_form = searchFormTable;
      if (this.firstTimeSearch){
        if (this.request){
          this.request.unsubscribe();
        }
        this.globals.showSpinner = true;
        /* If nothing to serach*/
        if (!this.somethingtoSearch()) {
          this.request = this.findService.initFinding().subscribe(table_info => {
            this.findService.changeTable(table_info);
            this.findService.changePlot(table_info);
            this.globals.showSpinner = false;
          });
        }
        /* If something to serach*/
        else {
          this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(
            (data)=> { 
              this.findService.changeTable(data); 
              this.globals.showSpinner = false;
            },(error)=>{
              this.globals.errorMsg=error.message;
              this.globals.showError = true;
          });
        }
      }
      this.firstTimeSearch=true;
    });

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

      this.minDose = table_info['allOptions']['dose_min'];
      this.maxDose = table_info['allOptions']['dose_max'];
    
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

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflow = "hidden";
    document.getElementById("main").style.marginLeft = "25px";document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.width = "100%";
  }

  selectCategory(event: any) {
    this.hasCategory = true;
    this.selectedCategory = event.target.value;

    if (!(event.target.value in this.categories_search_form)) {
      this.categories_search_form[event.target.value] = null;
    }
  }

  isCategoryFiltered(category: string) {
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

  addSearchSelect(event: any) {
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

  addSearchCheckBox(event: any,id:string) {
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

  changeExposureFrom() {
    if (this.search_form['max_exposure'] === undefined) {
      this.search_form['max_exposure'] = this.maxExposure;
    }
    if (String(this.fromValue) == '') {
      if (this.search_form['max_exposure'] == this.maxExposure) {
        delete this.search_form['min_exposure'];
        delete this.search_form['max_exposure'];
      } else {
        this.search_form['min_exposure']=this.minExposure;
      }
    } else {
      if (this.fromValue == this.minExposure && 
          this.search_form['max_exposure'] == this.maxExposure) {
        delete this.search_form['min_exposure'];
        delete this.search_form['max_exposure'];
      } else {
        this.search_form['min_exposure']=this.fromValue;
      }
    }

    this.findService.changeSearchFormTable(this.search_form);
  }

  changeExposureTo() {
    if (this.search_form['min_exposure'] === undefined) {
      this.search_form['min_exposure'] = this.minExposure;
    }
    if (String(this.toValue) == '') {
      if (this.search_form['min_exposure'] == this.minExposure) {
        delete this.search_form['min_exposure'];
        delete this.search_form['max_exposure'];
      } else {
        this.search_form['max_exposure']=this.maxExposure;
      }
    } else {
      if (this.search_form['min_exposure'] == this.minExposure && 
          this.toValue == this.maxExposure) {
        delete this.search_form['min_exposure'];
        delete this.search_form['max_exposure'];
      } else {
        this.search_form['max_exposure']=this.toValue;
      }
    }
    
    this.findService.changeSearchFormTable(this.search_form);
  }

  changeDoseFrom() {
    if (this.search_form['max_dose'] === undefined) {
      this.search_form['max_dose'] = this.maxDose;
    }
    if (String(this.minDoseValue) == '') {
      if (this.search_form['max_dose'] == this.maxDose) {
        delete this.search_form['min_dose'];
        delete this.search_form['max_dose'];
      } else {
        this.search_form['min_dose']=this.minDose;
      }
    } else {
      if (this.minDoseValue == this.minDose && 
          this.search_form['max_dose'] == this.maxDose) {
        delete this.search_form['min_dose'];
        delete this.search_form['max_dose'];
      } else {
        this.search_form['min_dose']=this.minDoseValue;
      }
    }

    this.findService.changeSearchFormTable(this.search_form);
  }

  changeDoseTo() {
    if (this.search_form['min_dose'] === undefined) {
      this.search_form['min_dose'] = this.minDose;
    }
    if (String(this.maxDoseValue) == '') {
      if (this.search_form['min_dose'] == this.minDose) {
        delete this.search_form['min_dose'];
        delete this.search_form['max_dose'];
      } else {
        this.search_form['max_dose']=this.maxDose;
      }
    } else {
      if (this.search_form['min_dose'] == this.minDose && 
          this.maxDoseValue == this.maxDose) {
        delete this.search_form['min_dose'];
        delete this.search_form['max_dose'];
      } else {
        this.search_form['max_dose']=this.maxDoseValue;
      }
    }
    
    this.findService.changeSearchFormTable(this.search_form);
  }

  changeDoseDisabled () {
    this.doseDisabled = !this.doseDisabled;
    if (this.doseDisabled) {
      delete this.search_form['negative_min_dose'];
      this.negMinDose = null;
      this.findService.changeSearchFormTable(this.search_form);
    } 
  }

  changeNegMinDose() { 
    this.search_form['negative_min_dose'] = this.negMinDose;
    this.findService.changeSearchFormTable(this.search_form);
  }

  addCategory($event: any, type) {
   
    if ($event.value!==undefined){
      this.categories_search_form[this.selectedCategory][type] = $event.value;
      this.findService.changeCategoriesSearchForm(this.categories_search_form);
    }
  }

  addSearchForm($event: any, type) {

    if ($event.value!==undefined){

      /*DELETE*/
      if ($event.value==""){
        this.search_form[type].splice($event.value, 1);
        if (this.search_form[type].length==0){
          delete this.search_form[type]; 
        }  
      }
      /*ADD*/
      else{      
        this.search_form[type] = $event.value;
      }

      this.findService.changeSearchFormTable(this.search_form);
    } 
  }

  somethingtoSearch() {
    if (Object.keys(this.search_form).length>0) {
      return true
    }
    for (let source of this.sources) { 
      if (this.categories_search_form[source]['parameters'].length>0 ||
          this.categories_search_form[source]['observations'].length>0)
        { return true }
    } 
    return false
  }
  
  resetFilters() {    
    this.search_form={}
    this.globals.showSpinner = true;
    for (let source of this.sources){  
      this.categories_search_form[source]['parameters']=[]
      this.categories_search_form[source]['observations']=[]
    }
    this.relevant_form = false;
    this.BOTH = false;
    this.F = false;
    this.M = false;
    this.toValue = null;
    this.fromValue = null;
    this.minDoseValue = null;
    this.maxDoseValue = null;
    this.negMinDose = null;
    this.doseDisabled = true;
    this.hasCategory = false;
    this.findService.changeCategoriesSearchForm(this.categories_search_form);
    this.findService.changeSearchFormTable(this.search_form);
    if (this.request){
      this.request.unsubscribe();
    }
    this.request = this.findService.initFinding().subscribe(table_info => {
      this.findService.changeTable(table_info);
      this.findService.changePlot(table_info);
      this.globals.showSpinner = false;
    });
  }

  download() { 
    this.findService.downloadFiles();
  }
}
