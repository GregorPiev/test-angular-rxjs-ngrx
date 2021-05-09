import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProductComponent } from './products/product/product.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ResolverService } from './service/resolver.service'

const routes: Routes = [
  {
    path: '', component: ProductComponent, resolve: {
      courses: ResolverService
    }
  },
  { path: 'create', component: ProductAddComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
