import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  relevant_form : boolean;
  search_form = {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit(){   
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
  }

  addSearchCheckBox(event: any){

    if (event.target.checked){   
      this.search_form[event.target.id]=[event.target.value];   
    }
    else{   
      delete this.search_form[event.target.id];
    }
  }

  change_relevant(count){

   this.relevant_form=false;

  } 
}
