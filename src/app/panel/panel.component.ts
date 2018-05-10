import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  objectKeys = Object.keys;
  @Input() search_info = {};
  @Output()relevantClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  removeThis(key: string,value: string){

   
    if (key=="relevantOnly"){
      this.relevantClose.emit(false);
    }

    if (value===undefined){
      delete this.search_info[key];
    }
    else{
      this.search_info[key].splice(value, 1);
      if (this.search_info[key].length==0){
        delete this.search_info[key];
      }
    }   
  }
}
