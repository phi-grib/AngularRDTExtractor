import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { TreeviewItem, TreeviewEventParser, DownlineTreeviewEventParser} from 'ngx-treeview';
import { ModalDialogService } from 'ngx-modal-dialog';
//import { SketchModalComponent } from '../sketch/sketch.component';
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
  search_form = {};
  categories_search_form = {};
  table_info = {};
  router;

  // Set this value on init to store the total number of studies and structures
  // so that we can calculate the current fraction selected
  totalStudies: number;   
  totalStructures: number;
  // Store global minimum and maximum exposure values
  minExposure: number;
  maxExposure: number;

  categoryOptionsSelected ={};
  categoryOptions = {}

  config_select = {
    //displayKey:"name", //if objects array passed which key to be displayed defaults to description
    search: true,
    height: '300px',
    placeholder: 'select'
  };

  constructor(private httpClient: HttpClient, 
              private modalDialogService: ModalDialogService, 
              private viewContainer: ViewContainerRef,
              private findService : FindingsService,
              private _router: Router,
              private globals: Globals ) {
    this.router = _router;
  }

  ngOnInit(){
    this.globals.showSpinner = true;
   // this.items_organs=this.createTreeview(table_info['allOptions']['organs'][this.selectedCategory]);
   //this.items_observations=this.createTreeview(table_info['allOptions']['observations'][this.selectedCategory]);
    this.findService.currentTable.subscribe(table_info =>this.table_info = table_info);

    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>{
      this.categories_search_form = categoriesSearchForm;
      if (this.firstTimeCategorySearch){
        if (this.request){
            this.request.unsubscribe();
        }
        /*Case TABLE*/
        this.globals.showSpinner = true;
        this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => {  
          this.findService.changeTable(table_info);
          this.globals.actualStructures=table_info['num_structures'];
          this.globals.actualStudies=table_info['num_studies']; 
          for (let source of this.sources){ 
            this.categoryOptions[source]['organs']=table_info['allOptions']['organs'][source]
            this.categoryOptions[source]['observations']=table_info['allOptions']['observations'][source]
            this.categoryOptionsSelected[source]['organs'] =  this.categories_search_form[source]['organs']
            this.categoryOptionsSelected[source]['observations'] =   this.categories_search_form[source]['observations']
          }
          this.globals.showSpinner = false;
        });
 
      }
      this.firstTimeCategorySearch=true;   
    });

    this.findService.currentSearchFormTable.subscribe (searchFormTable =>{
      this.search_form = searchFormTable;
      if (this.firstTimeSearch){
        if (this.request){
            this.request.unsubscribe();
        }
      
        this.globals.showSpinner = true;
        this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => { 
          this.globals.actualStructures=table_info['num_structures'];
          this.globals.actualStudies=table_info['num_studies']; 
          for (let source of this.sources){ 
            this.categoryOptions[source]['organs']=table_info['allOptions']['organs'][source]
            this.categoryOptions[source]['observations']=table_info['allOptions']['observations'][source]
          }
          this.findService.changeTable(table_info);  
          this.globals.showSpinner = false;
        });
        
        /*Case PLOT*/
       /* else if (this.router.url=="/plot"){
          this.findService.getplot(this.search_form,this.categories_search_form).subscribe(info => {
           this.table_info['allOptions']=info['allOptions'];
           this.table_info['num_structures']=info['num_structures'];
           this.table_info['num_studies']=info['num_studies'];
           this.globals.actualStructures=info['num_structures'];
           this.globals.actualStudies=info['num_studies'];
          });
        }*/
      }
      this.firstTimeSearch=true;
    });

    this.findService.initFinding().subscribe(table_info => {
      this.totalStructures = table_info['num_structures'];
      this.totalStudies = table_info['num_studies'];
      this.globals.totalStructures = table_info['num_structures'];
      this.globals.totalStudies = table_info['num_studies'];
      this.globals.actualStructures = table_info['num_structures'];
      this.globals.actualStudies = table_info['num_studies'];
      this.sex = table_info['allOptions']['sex'];
      this.sources = table_info['allOptions']['sources'];
      for (let source of this.sources){ 

        this.selectedCategory=source
        this.categories_search_form[source] = {}
        this.categories_search_form[source]['organs']=[]
        this.categories_search_form[source]['observations']=[]
        
        this.categoryOptions[source] = {}
        this.categoryOptions[source]['organs']=table_info['allOptions']['organs'][source]
        this.categoryOptions[source]['observations']=table_info['allOptions']['observations'][source]

        this.categoryOptionsSelected[source] = {}
        this.categoryOptionsSelected[source]['organs']=[]
        this.categoryOptionsSelected[source]['observations']=[]
      }
      this.findService.changeTable(table_info);
      this.globals.showSpinner = false;
    });
  }

  selectCategory(event: any){
    this.hasCategory = true;
    this.selectedCategory = event.target.value;

    //this.items_organs=this.createTreeview(this.table_info['allOptions']['organs'][this.selectedCategory],this.selectedCategory,'organs');
    //this.items_observations=this.createTreeview(this.table_info['allOptions']['observations'][this.selectedCategory],this.selectedCategory,'observations');
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

      console.log(event);
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
      //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));

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
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));

  }

  addSliderInfo($event){
    this.search_form['min_exposure']=$event.from;
    this.search_form['max_exposure']=$event.to;
    this.findService.changeSearchFormTable(this.search_form);
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));
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
    // document.getElementsByTagName("ngx-select-dropdown")[0].reset( );
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));
    //document.getElementById('category').selectedIndex = "0";
  }

 /* openSketchModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Compound seach',
      childComponent: SketchModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        modalDialogClass: "modal-dialog modal-dialog-centered modal-lg"
      },
      data: "Test"
    });
  }*/

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflow = "hidden";
    document.getElementById("main").style.marginLeft = "25px";
  }

  addCategory($event: any, type){
    this.categories_search_form[this.selectedCategory][type] = $event.value;
    this.findService.changeCategoriesSearchForm(this.categories_search_form);
  }

  addSearchForm($event: any, type){
    this.search_form[type] = $event.value;
    this.findService.changeSearchFormTable(this.search_form);
  }

  // getSmiles() {
  //   jme = document.getElementById("jme")
  //   var drawing = jme.smiles();
  //   document.form.smi.value = drawing;
  // }

  // submitSmiles() {
  //   var smiles = document.jme.smiles();
  //   var jme = document.jme.jmeFile();
  //   if (smiles == "") {
  //     alert("Nothing to submit");
  //   }
  //   else {
  //     opener.fromEditor(smiles,jme);
  //     window.close();
  //   }
  // }

  // openHelpWindow() {
  //   window.open("http://www.molinspiration.com/jme/help/jme2008hints.html","jmehelp","toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=510,height=675,left=400,top=20");
  // }
}
