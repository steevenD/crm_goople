import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.authenticationService.generateFormRegister();
  }

  /**
   * to register a user
   */
  handleClickRegister() {
    this.authenticationService.register(this.form.value).subscribe();
  }

}
