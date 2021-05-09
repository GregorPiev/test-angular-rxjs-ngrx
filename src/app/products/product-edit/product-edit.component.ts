import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getProduct } from '../store/selector/product.selectors';
import { Product } from '../../model/product';
import { Update } from '@ngrx/entity';
import { UpdateProduct } from '../store/action/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.less']
})
export class ProductEditComponent implements OnInit {
  myForm: FormGroup;
  currentProduct: string = null;

  constructor(
    private prodService: ProductService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [],
      Name: ['', [Validators.required, Validators.minLength(6)]],
      Description: ['', [Validators.required, Validators.minLength(20)]],
      Price: ['', [Validators.required]],
      CreationDate: []
    });   

    this.prodService.productEdit.subscribe(elem => {      
      this.myForm.setValue(elem);
      this.currentProduct = elem['Name'];      
    });
  }

  submit(): void {
    this.myForm.value.CreationDate = moment().format('YYYY-MM-DD');    

    const update: Update<Product> = {
      id: this.myForm.value.id,
      changes: {        
        ...this.myForm.value
      }
    };

    this.store.dispatch(UpdateProduct({ update }));
    this.myForm.reset();
    this.currentProduct = null;
  }

}
