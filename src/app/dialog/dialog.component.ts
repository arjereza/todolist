import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  task: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) {
        item
    }: any
  ) { 
    this.task = item
  }

  close() {
      this.dialogRef.close();
  }

}
