import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgMaterialModule } from '../ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { productReducer } from './store/reducer/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effect/product.effects';
import { StoreModule } from '@ngrx/store';

const Components = [
  ProductAddComponent,
  ProductListComponent,
  ProductEditComponent,
  ProductComponent,
];

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    HttpClientModule,
    StoreModule.forFeature('entities', productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  exports: [...Components]
  
})
export class ProductsModule { }
