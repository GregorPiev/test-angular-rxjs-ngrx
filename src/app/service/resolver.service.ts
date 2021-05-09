import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { areProductsLoaded } from '../products/store/selector/product.selectors';
import { loadProducts, productsLoaded } from '../products/store/action/product.actions';

@Injectable()
export class ResolverService implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areProductsLoaded),
        tap((productsLoaded) => {
          if (!productsLoaded) {
            this.store.dispatch(loadProducts())
          }
        }),
        filter(productsLoaded => productsLoaded ),
        first()
      );
  }
}
