import { Component, OnInit, Input,ViewChild,QueryList,ElementRef,AfterViewInit ,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;
  table_info = {};

  constructor( private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentTable.subscribe(table_info => {
      this.table_info = table_info
    });
    this.basicChart()
  }


  basicChart() {

    const element = this.el.nativeElement

    const data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot( element, data, layout )
  }
}
