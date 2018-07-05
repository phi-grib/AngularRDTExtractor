import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FindingsService } from '../findings.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  objectKeys = Object.keys;
  search_form={};
  categories_search_form={};
  //@Input() searchFormPanel = {};
  //@Input() CategorySearchFormPanel = {};
  @Input() key:string;
  @Input() category:string;
  @Output() relevantClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentSearchFormTable.subscribe (searchFormTable => this.search_form = searchFormTable);
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm => this.categories_search_form = categoriesSearchForm);
    this.findService.currentTable.subscribe ();
  }  

  removeThis(key:string, value:string, category:string){
    if (category===undefined) {
      this.search_form[key].splice(value, 1);
      if (this.search_form[key].length==0){
        delete this.search_form[key]; 
        this.findService.changeSearchFormTable(this.search_form);
      }  
    } else {
      this.categories_search_form[category][key].splice(value, 1);
      if (this.categories_search_form[category][key].length==0){
        delete this.categories_search_form[category][key];
        if (Object.keys(this.categories_search_form[category]).length==0) {
          this.categories_search_form[category] = null;
        }
      }
      this.findService.changeSearchFormTable(this.search_form);
    }
    //this.findService.searchFinding(this.search_form,this.categories_search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
  }
}