import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {InfoService} from '../../../shared/services/info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  displayAlert = false;

  constructor(private authenticationService: AuthenticationService,
              private infoService: InfoService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.authenticationService.generateFormRegister();
  }

  /**
   * to register a user
   */
  handleClickRegister() {
    if (this.form.get('password').value === this.form.get('confirm_password').value) {
      this.authenticationService.register(this.form.value).subscribe(() => {
        this.infoService.showToast('InscriptionOKConnectéVous');
        this.router.navigate(['login']);
      }, (err) => this.displayAlertRegister());
    } else {
      this.displayAlertRegister();
    }
  }

  displayAlertRegister() {
    this.displayAlert = true;
    setTimeout(() => {
      this.displayAlert = false;
    }, 2000);
  }

}
