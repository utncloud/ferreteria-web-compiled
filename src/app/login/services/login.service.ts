import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { throwError, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAuth } from "../models/login.model";
import * as fromApp  from './../../store/app.reducer';
import * as LoginActios from '../store/login.action';
import { error_message_handler } from 'src/app/shared/helper/error-message.handler';
import { IAuthResponse } from "../models/login.interface";

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {
    url= '/api/users';
    subscriptionUser: Subscription = null;
    userAuthenticate:IAuth;

    constructor( 
        private store: Store<fromApp.AppState>,
        private http: HttpClient
    ){this.getAuthentication()}

    authenticate(userNm: string, password: string){
        let result= new IAuthResponse();
        return this.http.get<IAuth[]>(this.url).pipe(
            map((response) => {
                let user = response.filter(item=> item.userName === userNm && item.password === password);
                if (user && user.length > 0)
                {
                    if (user[0].isActive){
                        this.store.dispatch(new LoginActios.AuthenticateUser(user[0]));
                        result.auth = user[0];
                    }else{
                        result.isError= true;
                        result.errorMessage="The user is not active. Please contact the system administrator";
                    }
                }else{
                    //let customError= {
                        //error:{message_code:''}
                    //}
                    //customError.error.message_code = "User name or password is not correct.";
                    result.isError= true;
                    result.errorMessage="User name or password is not correct.";
                }
                return result;
            }),
            catchError((error: any) => {
                this.store.dispatch(new LoginActios.LogoutUser());                
                result.errorMessage = error_message_handler(error);
                return throwError(error);
            })
        );
    }

    private getAuthentication(){
        this.subscriptionUser = this.store.select('auth').subscribe(authStore => {
            this.userAuthenticate=null;
            if (authStore && authStore != null && authStore.auth != null) {
                this.userAuthenticate = authStore.auth
            }
          });
    }
  }
