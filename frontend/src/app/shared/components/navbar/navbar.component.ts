import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userConnected = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('userToken')) {
      this.userConnected = true;
      this.authService.setConnected(true);
    }
    this.followIfUserIsConnected();
  }

  /**
   * to follow if user is connected to change menu
   */
  followIfUserIsConnected() {
    this.authService.connected$.subscribe(val => {
      this.userConnected = val;
    });
  }

  handleClickLogout() {
    this.userConnected = false;
    localStorage.clear();
    this.authService.setConnected(false);
    this.router.navigate(['login']);
  }

}
