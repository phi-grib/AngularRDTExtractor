import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CustomModalComponent implements IModalDialog {
  smiles:string;

  constructor(private findService : FindingsService) {}

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {

    //this.findService.getStudy(options.data).subscribe(study => {this.parentInfo=study.study});
    this.smiles=options.data
  }

  ngAfterViewInit() {

    let options = {'width':400, 'height':400};
    let smilesDrawer = new SmilesDrawer.Drawer(options);

    SmilesDrawer.parse(this.smiles, function (tree) {
      smilesDrawer.draw(tree,"canvas",'light', false);
      }, function (err) {
        console.log(err);
    });
  }
}
