import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent{

  title = 'app';
  tab=1;
  multiSelect: any=["Amie Franklin"];

  stringOptions = [
      "Burns Dalton","Mcintyre Lawson","Amie Franklin","Jocelyn Horton","Fischer Erickson", "Medina Underwood","Goldie Barber"
  ]
  config = {
    //displayKey:"name", //if objects array passed which key to be displayed defaults to description
    search:true,
  };
  
  changeValue($event: any){
    console.log($event);
}
}
