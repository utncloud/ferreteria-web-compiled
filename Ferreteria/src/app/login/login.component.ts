import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { LoginService } from "./services/login.service";
import { IAuthResponse } from "./models/login.interface";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css'],
})
export class LoginComponent implements OnInit{
    pageTitle: string = "Login";
    userName: string = '';
    password: string = '';
    errorMessage: string='';

    constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router){}

    ngOnInit(): void {
        
    }

    login(): void {
        this.errorMessage='';
        this.loginService.authenticate(this.userName, this.password).subscribe(
            (response: IAuthResponse) => {
                if (response.isError)
                    this.errorMessage= response.errorMessage;
                else{
                    this.router.navigate(['/home']);
                }
            },
            (error) => {
                this.errorMessage = error.errorMessage;
              //let translate = this.translate.instant(`COMMON.MESSAGE_CODE.${error}`);
              //this.notificationService.createNotification({
                //type: 'error',
                //message:
                 // translate === `COMMON.MESSAGE_CODE.${error}`
                  //  ? this.translate.instant(`AREA.MESSAGE_CODE.${error}`)
                   // : translate,
              //});
            }
          );    
    }
}