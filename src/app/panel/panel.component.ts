import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  objectKeys = Object.keys;
  @Input() searchFormPanel = {};
  @Input() key :string;
  @Output()relevantClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentTable.subscribe ();
  }  

  removeThis(key: string,value: string){
    if (key=="relevantOnly"){
      delete this.searchFormPanel[key];
      this.relevantClose.emit(false);
    }

    if (value===undefined){
      delete this.searchFormPanel[key];
    }
    else{
      this.searchFormPanel[key].splice(value, 1);
      if (this.searchFormPanel[key].length==0){
        delete this.searchFormPanel[key];
      }
    } 
    this.findService.searchFinding(this.searchFormPanel,1).subscribe(table_info => this.findService.changeTable(table_info));
  }  
}
