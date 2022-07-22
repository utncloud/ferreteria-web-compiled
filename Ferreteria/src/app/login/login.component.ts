import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css'],
})
export class LoginComponent implements OnInit{
    pageTitle: string = "Login";
    userName: string = '';
    password: string = '';

    constructor(private route: ActivatedRoute, private router: Router){}

    ngOnInit(): void {
        
    }

    login(): void {
        this.router.navigate(['/home']);
    }
}