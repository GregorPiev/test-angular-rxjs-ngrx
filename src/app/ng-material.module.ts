import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';

const materialModules = [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class NgMaterialModule {}
