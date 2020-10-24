import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
})
export class ProductAddDialogComponent {
  public quantity: number;

  constructor(@Inject(MAT_DIALOG_DATA) public maxQuantity: number) {}
}
