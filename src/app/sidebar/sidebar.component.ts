import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
DownlineTreeviewItem,TreeviewEventParser,DownlineTreeviewEventParser} from 'ngx-treeview';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import { isNull } from 'util';
import { Router } from '@angular/router';

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

  items_organs: TreeviewItem[];
  items_observations: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: true,
      maxHeight: 400
  });
  last_sizeTree={};

  selectedChange=null;
  //
  buttonClass = 'btn-outline-secondary';

  relevant_form: boolean;
  F: boolean=false;
  M: boolean=false;
  BOTH: boolean=false;
  min_exposure: number;
  max_exposure: number;
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

  constructor(private httpClient: HttpClient, 
              private modalDialogService: ModalDialogService, 
              private viewContainer: ViewContainerRef,
              private findService : FindingsService,
              private _router: Router ) {
                this.router = _router;
              }

  ngOnInit(){
    
   // this.items_organs=this.createTreeview(table_info['allOptions']['organs'][this.selectedCategory]);
   //this.items_observations=this.createTreeview(table_info['allOptions']['observations'][this.selectedCategory]);
    this.last_sizeTree['organs']=0;
    this.last_sizeTree['observations']=0;
    this.findService.currentTable.subscribe(table_info =>this.table_info = table_info);
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm =>this.categories_search_form = categoriesSearchForm);

    this.findService.currentSearchFormTable.subscribe (searchFormTable =>{
      this.search_form = searchFormTable;
      if (this.firstTimeSearch){
        if (this.request){
            this.request.unsubscribe();
        }
        this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => {  
          this.items_organs=this.createTreeview(table_info['allOptions']['organs'][this.selectedCategory],this.selectedCategory,'organs');
          this.items_observations=this.createTreeview(table_info['allOptions']['observations'][this.selectedCategory],this.selectedCategory,'observations');
          this.findService.changeTable(table_info);
         
        });
      }
      this.firstTimeSearch=true;
    });

   

    this.findService.initFinding().subscribe(table_info => {
      this.totalStructures = table_info['num_structures'];
      this.totalStudies = table_info['num_studies'];
      this.sex = table_info['allOptions']['sex'];
      this.sources = table_info['allOptions']['sources'];
      for (let source of this.sources){  
        this.categories_search_form[source]=[];
        this.categories_search_form[source]=[];
      }
      this.findService.changeTable(table_info);
   
    });
  }

  selectCategory(event: any){
    this.hasCategory = true;
    this.selectedCategory = event.target.value;
    this.items_organs=this.createTreeview(this.table_info['allOptions']['organs'][this.selectedCategory],this.selectedCategory,'organs');
    this.items_observations=this.createTreeview(this.table_info['allOptions']['observations'][this.selectedCategory],this.selectedCategory,'observations');
    if (!(event.target.value in this.categories_search_form)) {
      this.categories_search_form[event.target.value] = null;
    }
    //this.findService.changeCategoriesSearchForm(this.categories_search_form);
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
      //alert(this.router.url)
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

      event.target.selectedIndex = "0";
  }

  addSearchCheckBox(event: any){
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
      this.search_form[event.target.id]=[event.target.value];   
    }
    else{   
      delete this.search_form[event.target.id];
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
    //this.hasCategory = false;
    this.findService.changeCategoriesSearchForm(this.categories_search_form);
    this.findService.changeSearchFormTable(this.search_form);
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));
    //document.getElementById('category').selectedIndex = "0";
  }

  /* Recursive function */ 
  createTreeview (fields:{},source:string,type:string):TreeviewItem[]{
    let items: TreeviewItem[] = [];
    let item
    let checked=false;
    for (var key in fields) {   
        if (Object.keys(fields[key]).length>0){   
          this.createTreeview(fields[key],source,type)
          checked=false;
          if (this.categories_search_form[source][type]!=undefined && this.categories_search_form[source][type].indexOf(key) > -1){
            checked=true;
          }
          item = new TreeviewItem({ text:key, value:key, collapsed: true, checked: checked,children: this.createTreeview(fields[key],source,type)})
          items.push(item);
        }
        else{
          checked=false;
          if (this.categories_search_form[source][type]!=undefined && this.categories_search_form[source][type].indexOf(key) > -1){
            checked=true;
          }
          item = new TreeviewItem({ text:key, value:key, collapsed: true,checked: checked})
          items.push(item);
        }      
    }  
    return items;
  }

  TreeFilterChange(downlineItems: DownlineTreeviewItem[], key:string) {
    // Initialize the search filter, removing all previous criteria
    // for this category / key pair
    if (this.categories_search_form[this.selectedCategory] == undefined) {
      this.categories_search_form[this.selectedCategory] = {};
    } 
    this.categories_search_form[this.selectedCategory][key]=[];
    // Walk through the tree and add the selected items and their parents 
    // to the filtering dictionary
    //console.log(downlineItems);
    
    downlineItems.forEach(downlineItem => {  
      const item = downlineItem.item;
      // this.rows[item.text]=true;
      if (this.categories_search_form[this.selectedCategory][key].indexOf(item.text)==-1){
        this.categories_search_form[this.selectedCategory][key].push(item.text);
      }
      let parent = downlineItem.parent;
      while (!isNull(parent) && parent.item.checked) {
        // this.rows[parent.item.text]=true;
        if (this.categories_search_form[this.selectedCategory][key].indexOf(parent.item.text)==-1){
          this.categories_search_form[this.selectedCategory][key].push(parent.item.text);
        }
        parent = parent.parent;
      }
    });

    if (downlineItems.length > 0 || this.last_sizeTree[key]!=0){
      this.last_sizeTree[key]=downlineItems.length;
      this.findService.changeCategoriesSearchForm(this.categories_search_form);
      this.request=this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));
    }
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
   
  }

  openCustomModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Compound seach',
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        modalDialogClass: "modal-dialog modal-dialog-centered modal-lg"
      },
      data: "Test"
    });
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflow = "hidden";
    document.getElementById("main").style.marginLeft = "25px";
  }
}
