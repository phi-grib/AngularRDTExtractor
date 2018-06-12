import { Component, OnInit, PipeTransform, Pipe, ViewChild} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;

  hasCategory: boolean=false;

  relevant_form: boolean;
  F: boolean=false;
  M: boolean=false;
  BOTH: boolean=false;
  min_exposure: number;
  max_exposure: number;

  objectKeys = Object.keys;
  search_form = {};
  table_info = {};

  sex = [];

  constructor(private httpClient: HttpClient, private findService : FindingsService) {}

  ngOnInit(){
    this.findService.currentTable.subscribe(table_info => this.table_info = table_info);
    this.findService.initFinding().subscribe(table_info => {
      this.sex = table_info['allOptions']['sex'];
      this.findService.changeTable(table_info)}
    );
  }

  selectCategory(event: any){
    this.hasCategory = true;
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
      /*this.findService.changeSearch(this.search_form);*/
      this.findService.searchFinding(this.search_form,1).subscribe(table_info => this.findService.changeTable(table_info));

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
    /*this.findService.changeSearch(this.search_form);*/
    this.findService.searchFinding(this.search_form,1).subscribe(table_info =>this.findService.changeTable(table_info));

  }

  addSliderInfo($event){
    this.search_form['min_exposure']=$event.from;
    this.search_form['max_exposure']=$event.to;
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
  }

  resetFilters(){    
    this.search_form={}
    this.relevant_form = false;
    this.BOTH = false;
    this.F = false;
    this.M = false;
    this.sliderElement.reset();
    this.findService.initFinding().subscribe(table_info => this.findService.changeTable(table_info));
  }
}
