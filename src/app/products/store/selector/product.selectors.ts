import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, selectAll, selectIds } from '../reducer/product.reducer';


export const productFeatureSelector = createFeatureSelector<ProductsState>('entities');

export const getAllProducts = createSelector(
  productFeatureSelector,
  selectAll
)

export const getProduct = createSelector(
  productFeatureSelector,
  selectIds
)

export const areProductsLoaded = createSelector(
  productFeatureSelector,
  state => state.productsLoaded
)
