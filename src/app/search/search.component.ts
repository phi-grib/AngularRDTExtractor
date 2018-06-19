import { Component, OnInit, PipeTransform, Pipe, ViewChild} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
TreeviewEventParser, DownlineTreeviewEventParser, DownlineTreeviewItem} from 'ngx-treeview';
import { isNull } from 'util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;

  items_organs: TreeviewItem[];
  items_observations: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
     hasAllCheckBox: false,
      hasFilter: true,
      maxHeight: 400   
  });

  buttonClass = 'btn-outline-secondary';
  rows={}

  hasCategory: boolean=false;

  relevant_form: boolean;
  F: boolean=false;
  M: boolean=false;
  BOTH: boolean=false;
  min_exposure: number;
  max_exposure: number;
  sex = [];
  selectedCategory: string;

  objectKeys = Object.keys;
  search_form = {};
  table_info = {};

  categories_search_form = {};

  // Set this value on init to store the total number of studies and structures
  // so that we can calculate the current fraction selected
  totalStudies: number;   
  totalStructures: number;

  constructor(private httpClient: HttpClient, private findService : FindingsService) {}

  ngOnInit(){
   
    this.findService.currentTable.subscribe(table_info => {
      this.table_info = table_info
      if (this.table_info['allOptions']!== undefined){
          this.items_organs=this.createTreeview( table_info['allOptions']['organs']);
          this.items_observations=this.createTreeview( table_info['allOptions']['observations']);
          this.sex = table_info['allOptions']['sex'];
          this.totalStructures = table_info['num_structures'];
          this.totalStudies = table_info['num_studies'];
      }
      
    
    });
    this.findService.initFinding().subscribe(table_info => {
      this.findService.changeTable(table_info)}
    );    
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
      this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));

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
    this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));

  }

  addSliderInfo($event){
    this.search_form['min_exposure']=$event.from;
    this.search_form['max_exposure']=$event.to;
    this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
  }

  resetFilters(){    
    this.search_form={}
    this.relevant_form = false;
    this.BOTH = false;
    this.F = false;
    this.M = false;
    this.sliderElement.reset();
    this.findService.initFinding().subscribe(table_info =>{ 
      this.findService.changeTable(table_info);
      this.items_organs=this.createTreeview( table_info['allOptions']['organs']);
      this.items_observations=this.createTreeview(table_info['allOptions']['observations']);
    });
    this.hasCategory = false;
    this.categories_search_form = {};
    //document.getElementById('category').selectedIndex = "0";
  }

  /*Recursive function*/ 
  createTreeview (organs:{}):TreeviewItem[]{
    let items: TreeviewItem[] = [];
    let item
    for (var key in organs) {   
        if (Object.keys(organs[key]).length>0){    
            this.createTreeview(organs[key])
            item = new TreeviewItem({ text:key, value:key, collapsed: true, checked: false,children: this.createTreeview(organs[key])})
            items.push(item);
        }
        else{
            item = new TreeviewItem({ text:key, value:key, collapsed: true,checked: false})
            items.push(item);
        }      
    }  
    return items;
  }

  addCategorySearch(key:string, value:string){
    if (this.categories_search_form[this.selectedCategory] == undefined) {
      this.categories_search_form[this.selectedCategory] = {};
      this.categories_search_form[this.selectedCategory][key]=[value];
    } else if (key in this.categories_search_form[this.selectedCategory]){
      // If the value(name to search) is already inserted
      if (this.categories_search_form[this.selectedCategory][key].indexOf(value)==-1){   
        this.categories_search_form[this.selectedCategory][key].push(value);
      }
    }
    else{
      this.categories_search_form[this.selectedCategory][key]=[value];
    }
  }

  TreeFilterChange(downlineItems: DownlineTreeviewItem[], key:string) {
    // this.rows = {};
    downlineItems.forEach(downlineItem => {   
      const item = downlineItem.item;
      this.rows[item.text]=true;
      let parent = downlineItem.parent;
      while (!isNull(parent) && parent.item.checked) {
        // this.rows[parent.item.text]=true;
        this.addCategorySearch(key, parent.item.text);
        parent = parent.parent;
      }
    });
    this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
  }
}
