import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './Product/product.module';
import { LoginModule } from './login/login.module';

@NgModule({  
  declarations: [
    AppComponent    
    , HomeComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }