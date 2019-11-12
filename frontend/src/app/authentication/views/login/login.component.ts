import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.form = this.authenticationService.generateFormLogin();
  }

  handleClickLogin() {
    this.authenticationService.login(this.form.value).subscribe((jwtToken: any) => {
      localStorage.setItem('userToken', jwtToken.token);
      this.authenticationService.setConnected(true);
    },
      (err) => {
      console.log(err);
        this.authenticationService.setConnected(false);

      });
  }
}
