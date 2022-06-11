import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'  
  // template:`
  //   <nav class= 'navbar navbar-expand navbar-light bg-light'>
  //     <a class='navbar-brand'>{{pageTitle}}</a>
  //     <ul class='nav nav-pills'>
  //       <li><a class='nav-link' [routerLink] = "['/home']">Home</a></li>
  //       <li><a class='nav-link' [routerLink] = "['/products']">Product List</a></li>
  //     </ul>
  //   </nav>
  //   <div class='container'>
  //      <router-outlet></router-outlet>
  //   </div>   
  //   `
})
export class AppComponent { pageTitle: string = 'Product Inventory'}
