import { Component } from '@angular/core';
import { FindingsService } from './findings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RDTExtractor';

  constructor(private findService : FindingsService) {}
  
  download() { 
    this.findService.downloadFiles();
  }
}



