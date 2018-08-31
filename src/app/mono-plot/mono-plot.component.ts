import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DndDropEvent } from "ngx-drag-drop";
import 'chart.piecelabel.js';
import { Color, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-mono-plot',
  templateUrl: './mono-plot.component.html',
  styleUrls: ['./mono-plot.component.css']
})

export class MonoPlotComponent implements AfterViewInit {

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  @Input() data: any[];
  @Input() labels: any[];
  @Input() datasets: any[];
  @Input() chartType: string = 'line';
  @Input() legend: boolean = true;
  @Input() options: any;
  @Input() title: string;

  colors:Array<any> =
  [ "#E3464A",
    "#89BDAB",
    "#F0EDDB",
    "#216F78",
    "#E8C098",
    "#BFB6B3",
    "#E8A631",
    "#49C4D1",
    "#9A794C",
    "#253741",
    "#A11E22",
    "#FAAC77",
    "#C9C980",
    "#F8EFEE",
    "#60686F",
    "#333C3E"
  ];
  chartsColors: Array<Color> = [ { } ];
  
  charts = [
    {id: 'pie', name: "Pie"},
    {id: 'doughnut', name: "Doughnut"},
    // {id: 'bar', name: "Verical Bar"},
    // {id: 'line', name: "Line"},
    // {id: 'radar', name: "Radar"},
    // {id: 'horizontalBar', name: "Horizontal Bar"}
  ];

  public xAxis:string[] = [
  ];

  public yAxis:string[] = [
  ];

  constructor() { }

  ngAfterViewInit() {
    this.options={
      responsive: true,
      title: {
        display: true,
        text: this.title,
        fontSize: 20
      },
      legend: {
        position: 'right',
        usePointStyle: true
      }
    };
  }

  onDrop( event:DndDropEvent, list:any[] ) {
    let index = event.index;
    if( typeof index === "undefined" ) {
      index = list.length;
    }
    list.splice( index, 0, event.data );
    if (this.xAxis.length>0 && this.yAxis.length>0){
      alert("Both")
    }
  }

  onDragged( item:any, list:any[] ) {
    const index = list.indexOf( item );
    list.splice( index, 1 );
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
