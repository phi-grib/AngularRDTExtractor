import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  relevant_form : boolean;

  objectKeys = Object.keys;
  search_form = {};
  table_info = {}

  organs = [];
  observations = [];
  species = [];
  sex = [];
  routes = [];

  constructor(private httpClient: HttpClient, private findService : FindingsService) {}

  ngOnInit(){  
    
    this.findService.currentSearch.subscribe (search_form => this.search_form = search_form);
    this.findService.changeSearch(this.search_form);

    //this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
  
    this.showOrgans();
    this.showObservations();
    this.showSpecies();
    this.showRoutes();
    this.showSex();
  }

  showOrgans(): void {
    this.findService.getOrgans()
      .subscribe(res => this.organs = res['organs']);
  }

  showObservations(): void {
    this.findService.getObservations()
      .subscribe(res => this.observations = res['observations']);
  }

  showSpecies(): void {
    this.findService.getSpecies()
      .subscribe(res => this.species = res['species']);
  }

  showRoutes(): void {
    this.findService.getRoutes()
      .subscribe(res => this.routes = res['route']);
  }

  showSex(): void {
    this.findService.getSex()
      .subscribe(res => this.sex = res['sex']);
  }

  addSearchSelect(event: any){
      // If the key(field of search) is already inserted   
      if (event.target.id in this.search_form){
        // If the value(name to search) is already inserted
        if (event.target.id == "sex"){
          this.search_form[event.target.id].pop()
        }
        if (this.search_form[event.target.id].indexOf(event.target.value)==-1){   
          this.search_form[event.target.id].push(event.target.value);
        }
      }
      else{
        this.search_form[event.target.id]=[event.target.value];
      }
      this.findService.changeSearch(this.search_form);
      this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                                  this.findService.changeTable(this.table_info);
                                                                  });
    
  } 

  addSearchText(event: any){

    if (event.key=="Enter"){ 
      if (event.target.id in this.search_form){
        // If the value(name to search) is already inserted
        this.search_form[event.target.id].pop();  
        this.search_form[event.target.id].push(event.target.value);
      }
      else{
        this.search_form[event.target.id]=[event.target.value];
      }

    }
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                                this.findService.changeTable(this.table_info);
                                                                });

  }

  addSearchCheckBox(event: any){

    if (event.target.checked){   
      this.search_form[event.target.id]=[event.target.value];   
    }
    else{   
      delete this.search_form[event.target.id];
    }
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
      this.findService.changeTable(this.table_info);
      });

  }
  change_relevant(count){

   this.relevant_form=false;
   this.findService.changeSearch(this.search_form); 
   this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                               this.findService.changeTable(this.table_info);
                                                               });

  }   
}
