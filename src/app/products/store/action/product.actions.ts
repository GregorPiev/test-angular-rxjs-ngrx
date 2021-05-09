import { createAction, props } from '@ngrx/store';
import { Product } from '../../../model/product';
import { Update } from '@ngrx/entity';

export enum EProductAction {
  LOAD_PRODUCTS = '[Products List] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products Effect] Products loaded successfully',
  ADD_PRODUCT = '[Product] Add Product',
  DELETE_PRODUCT = '[Product] Delete Product',
  UPDATE_PRODUCT = '[Product] Update Product',
}

export const loadProducts = createAction(
  EProductAction.LOAD_PRODUCTS
);

export const productsLoaded = createAction(
  EProductAction.LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const AddProduct = createAction(
  EProductAction.ADD_PRODUCT,  
  props<{ product: Product }>()
);

export const DeleteProduct = createAction(
  EProductAction.DELETE_PRODUCT,  
  props<{ id: string }>()
);

export const UpdateProduct = createAction(
  EProductAction.UPDATE_PRODUCT,  
  props<{ update: Update<Product> }>()
);

export const productActionTypes = {
  loadProducts,
  productsLoaded,
  AddProduct,
  DeleteProduct,
  UpdateProduct
}




