import { Component } from '@angular/core';
import { FindingsService } from './findings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RDTExtractor';
  doseDisabled:boolean=true
  mindose: number;

  constructor(private findService : FindingsService) {}
  
  download() { 
    alert(this.mindose)
    this.findService.downloadFiles();
  }
  enableDose(){
    this.mindose=null
    this.doseDisabled = this.doseDisabled ? false : true;
  }
}



