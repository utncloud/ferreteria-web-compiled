import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAuth } from "../models/login.model";
import * as fromApp  from './../../store/app.reducer';
import * as LoginActios from '../store/login.action';
import { error_message_handler } from 'src/app/shared/helper/error-message.handler';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {
    url = 'src/api/users/users.json'; //'../../../api/users/users.json';

    constructor( 
        private store: Store<fromApp.AppState>,
        private http: HttpClient
    ){}

    authenticate(user: string, password: string){
        return this.http.get<IAuth>(this.url).pipe(
            map((response) => {       
                let logins = response;      
                this.store.dispatch(new LoginActios.AuthenticateUser(logins[0]));
                return response;
            }),
            catchError((error) => {
                this.store.dispatch(new LoginActios.LogoutUser());
                return throwError(error_message_handler(error));
            })
        );
    }
  }
