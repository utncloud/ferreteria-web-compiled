import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/services/login.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    if (this.loginService.userAuthenticate==null){
      this.router.navigate(['/login']);
    }
  }

}
