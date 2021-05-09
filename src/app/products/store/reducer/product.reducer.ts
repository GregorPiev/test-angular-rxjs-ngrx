import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { productActionTypes, productsLoaded } from '../action/product.actions';
import { Product } from '../../../model/product';

// export const productFeatureKey = 'product';

export interface ProductsState extends EntityState<Product> {
  productsLoaded: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState = adapter.getInitialState({
  productsLoaded: false
});


export const productReducer = createReducer(
  initialState,
  on(
    productActionTypes.productsLoaded,
    (state, action) => {
      return adapter.setAll(
        action.products,
        { ...state, productsLoaded: true }
      );
    }
  ),
  on(
    productActionTypes.AddProduct,
    (state, action) => {
      return adapter.addOne(action.product, state);
    }
  ),
  on(
    productActionTypes.DeleteProduct,
    (state, action) => {
      return adapter.removeOne(action.id, state);
    }
  ),
  on(
    productActionTypes.UpdateProduct,
    (state, action) => {
      return adapter.updateOne(action.update, state);
    }
  )
);

export const { selectAll, selectIds } = adapter.getSelectors();
