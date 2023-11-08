import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-layout-modal',
  templateUrl: './layout-modal.component.html',
  styleUrls: ['./layout-modal.component.scss']
})
export class LayoutModalComponent implements OnInit {

  @Input() label: string = '';
  @Input() title: string = '';
  @Input() showActions: boolean = false;

  constructor(public dialogRef: MatDialogRef<LayoutModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.title = this.data?.title;
    this.label = this.data?.label;
    this.showActions = this.data?.showActions;
    if (!this.showActions) {
      setTimeout(() => {
        this.close();
      }, 3500);
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
