import { Component, OnInit } from '@angular/core';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-filter-info',
  templateUrl: './filter-info.component.html',
  styleUrls: ['./filter-info.component.css']
})

export class FilterInfoComponent implements OnInit {

  objectKeys = Object.keys;
  search_form=<any>{};
  categories_search_form=<any>{};
  hasTypeInfo=<any>{};
  hasType:boolean=false;
  types: Array<string>;

  constructor(private findService : FindingsService) { }

  ngOnInit() {
    this.types = ['parameters','observations']
    this.findService.currentSearchFormTable.subscribe (searchFormTable => this.search_form = searchFormTable);
    this.findService.currentCategoriesSearchForm.subscribe (categoriesSearchForm => {
      this.categories_search_form = categoriesSearchForm;
      /*RESET hasTypeInfo*/
      this.hasType=false;
      for (let type of this.types){
        this.hasTypeInfo[type]=false;
      }
      /*Check if types has info*/
      for (let type of this.types){
        for (let category of this.objectKeys(this.categories_search_form)){
          if (this.categories_search_form[category][type].length>0){
            this.hasTypeInfo[type]=true;
            this.hasType=true;
          }
        }
      }
    });
    this.findService.currentTable.subscribe ();
  }  

  removeOne(key:string, value:string, category:string) {
    if (category===undefined) {
      this.search_form[key].splice(value, 1);
      if (this.search_form[key].length==0){
        delete this.search_form[key]; 
      }  
      this.findService.changeSearchFormTable(this.search_form);
    } 
    else {
      this.categories_search_form[category][key].splice(value, 1);
      this.findService.changeCategoriesSearchForm(this.categories_search_form);
    }
  }


  removeAll(type:string) {
    if (type in this.search_form) {
      delete this.search_form[type];   
      this.findService.changeSearchFormTable(this.search_form);
    } 
    else {
      for (let category of this.objectKeys( this.categories_search_form)){
        this.categories_search_form[category][type]=[];
      }
      this.findService.changeCategoriesSearchForm(this.categories_search_form);
    }
  }
  
  removeExposure() {
    delete this.search_form["min_exposure"];
    delete this.search_form["max_exposure"];
    this.findService.changeSearchFormTable(this.search_form);
  }
}
