# MyProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Install node modules
Run `sh install_node_modules.sh`

Among these modules, there is an error due to a [bug in the chart2js library](https://github.com/m0t0r/ng2-charts/blob/master/components/charts/charts.ts#L68).
To fix it, one needs to edit a file (ng2-charts/components/charts/charts.ts or ng2-charts/charts/charts.js depending on the distribution) so that 'OnChanges' looks like this:

```
BaseChartDirective.prototype.ngOnChanges = function (changes) { 
    if (this.initFlag) { 
        // Check if the changes are in the data or datasets 
        if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets') || changes.hasOwnProperty('labels')) { 
            this.chart.data.datasets = this.getDatasets(); 
            this.chart.data.labels = this.labels; 
            this.chart.update(); 
        } else { 
            this.refresh(); 
        } 
    } 
};
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).