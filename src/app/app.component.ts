import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as LoginActions from './login/store/login.action';
import { IAuthState } from "./login/models/login.interface";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as LoginActios from './login/store/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit { 
  pageTitle: string = 'Product Inventory'; 
  userName: string ='';
  isAuth: boolean = false;

  subscriptionUser: Subscription = null;

  constructor(private store: Store<fromApp.AppState>, private router: Router){

  }

  ngOnInit(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(authStore => {
      if (authStore && authStore != null && authStore.auth != null) {
        this.userName = authStore.auth.email;
        this.isAuth= true;
      }else{
        this.isAuth=false;
        this.router.navigate(['/login']);
      }
    });
  }
  
  logOut(): void  {
    this.userName="";
    this.isAuth=false;
    this.store.dispatch(new LoginActios.LogoutUser());
    this.router.navigate(['/login']);
  }
}
