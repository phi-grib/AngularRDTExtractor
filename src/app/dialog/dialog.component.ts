import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CustomModalComponent implements IModalDialog {
  parentInfo: string;

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
  }
}
