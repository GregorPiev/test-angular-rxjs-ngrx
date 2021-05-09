import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { productActionTypes, productsLoaded } from '../action/product.actions';


@Injectable()
export class ProductEffects {
  productsLoaded: any;

  constructor(
    private actions$: Actions,
    private prodService: ProductService,
    private router: Router
  ) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.loadProducts),
      concatMap((action) => this.prodService.preloadProducts()),
      map(products => productActionTypes.productsLoaded({ products: products }))
    )
  );

  AddProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.AddProduct),
      concatMap((action) => this.prodService.addProduct(action.product)
        .pipe(
          tap(() => this.router.navigate(['/']))
        )
      )      
    ),
    { dispatch: false }  
  );

  DeleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.DeleteProduct),
      concatMap((action) => this.prodService.deleteProduct(action.id))
    ),
    { dispatch: false }
  );

  UpdateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.UpdateProduct),
      concatMap((action) => this.prodService.updateProductOne(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );
}
