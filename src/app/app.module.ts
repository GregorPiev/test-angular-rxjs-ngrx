import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsModule } from './products/products.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './service/product.service';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ResolverService } from './service/resolver.service';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreModule } from '@ngrx/store';
//import { appReducers } from './store/app.reducer';
//import { ProductsEffect } from './store/product.effect';

const Components = [
  AppComponent,
  HeaderComponent
];
@NgModule({
  declarations: [...Components],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    ProductsModule,    
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],    

  ],
  providers: [ProductService, ResolverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
