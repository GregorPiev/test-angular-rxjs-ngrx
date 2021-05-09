import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { getAllProducts } from '../store/selector/product.selectors'

import { Product } from 'src/app/model/product';
import { ProductService } from './../../service/product.service';

import { DeleteProduct, loadProducts, productsLoaded } from '../store/action/product.actions';
import { AppState } from '../../reducers';
import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['Name'];
  prodList: MatTableDataSource<Product[] | null> = null;  
  sortList = [
    { value: 'Name'},
    { value: 'Price'},
    { value: 'CreationDate'}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private prodService: ProductService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
       
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.store.select(getAllProducts)        
        .subscribe(result => {
          this.prodList = new MatTableDataSource(result as any);
          this.prodList.paginator = this.paginator;
          this.prodList.sort = this.sort;
        });

    }, 40);    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.prodList.filter = filterValue;
  }

  editElement(elem: any) {    
    this.prodService.sendProductToUpdate(elem);
  }

  addElemet() {
    this.router.navigate(['create']);
  }

  deleteHandler(event: any, product: Product) {
    const id = product.id;
    this.store.dispatch(DeleteProduct({ id }));
    event.stopPropagation();  
  }

  orderData(event, start: string) {
    console.log("Value:", event.target.value);
    let id = event.target.value;
    this.prodList.sort.sort(<MatSortable>({ id: id, start: start }));
    this.prodList.data.sort((a: any, b: any) => {
      if (a.CreationDate < b.CreationDate) {
        return -1;
      } else if (a.CreationDate > b.CreationDate) {
        return 1;
      } else {
        return 0;
      }
    });
    
  }

  ngOnDestroy(): void {}
}
