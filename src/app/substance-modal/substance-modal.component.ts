import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';
import { FindingsService } from '../findings.service';
import { SmilesDrawer } from 'smiles-drawer';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './substance-modal.component.html',
  styleUrls: ['./substance-modal.component.css']
})
export class SubstanceModalComponent implements IModalDialog {
  parentInfo: {};

  constructor(private findService : FindingsService) {}

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {

    this.findService.getSubstance(options.data).subscribe(substance => {this.parentInfo=substance.substance});

  }

  ngAfterViewInit() {
    let options = {'width':250, 'height':250};
    let smilesDrawer = new SmilesDrawer.Drawer(options);

    SmilesDrawer.parse(this.parentInfo['smiles'][0], function (tree) {
      smilesDrawer.draw(tree,"canvas",'light', false);
      }, function (err) {
        console.log(err);
    });
  }
}
