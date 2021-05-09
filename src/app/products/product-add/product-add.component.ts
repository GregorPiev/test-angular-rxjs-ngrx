import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { AddProduct } from '../store/action/product.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private prodService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({     
      Name: ['', [Validators.required, Validators.minLength(6)]],
      Description: ['', [Validators.required, Validators.minLength(20)]],
      Price: ['', [Validators.required]],
      CreationDate: []
    });
  }
  goHome() {
    this.router.navigate(['/']);
  }
  submit(): void {
    this.myForm.value.CreationDate = moment().format('YYYY-MM-DD');
    //this.prodService.addProduct(this.myForm.value)
    //  .subscribe(result => {
    //    this.myForm.reset();
    //    this.router.navigate(['/']);
    //  });

    //console.log('this.myForm.value:', this.myForm.value)

    let product: Product = {
      id: uuidv4(),
      Name: this.myForm.value.Name,
      Description: this.myForm.value.Description,
      Price: +this.myForm.value.Price,
      CreationDate: moment().format('YYYY-MM-DD')
    }

    console.log('product:', product)
    this.store.dispatch(AddProduct({ product }));
    this.myForm.reset();
  }

}
