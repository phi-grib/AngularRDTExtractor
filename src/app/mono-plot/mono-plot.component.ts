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
    // "#0E3D49",
    "#F12758",
    "#9A794C",
    "#FEFBEF",
    "#49C4D1",
    "#253741",
    "#A11E22",
    "#E8A631",
    "#E8C098",
    "#E5E4DA",
    "#BFB6B3",
    "#FAAC77",
    "#C9C980",
    "#F8EFEE",
    "#60686F",
    "#333C3E"
  ];
  chartsColors: Array<Color> = [ { }];
  
  charts = [
    {id: 'pie', name: "Pie"},
    {id: 'doughnut', name: "Doughnut"},
    {id: 'bar', name: "Verical Bar"},
    //{id: 'line', name: "Line"},
    //{id: 'radar', name: "Radar"},
    {id: 'horizontalBar', name: "Horizontal Bar"}
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
      pieceLabel: {
        render: function (args) {
          const label = args.label,
                value = args.value;
          return label + ': ' + value;
        },
        fontColor: '#000',
        position: 'outside',
        showZero:true,
        legend: {
          display: false,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
        }
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
