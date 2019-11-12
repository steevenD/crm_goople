import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {httpOptions, urlAPI} from "../../shared/constants/env";
import {User} from "../user.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * to follow if user is connected to change menu
   */
  private connected = new BehaviorSubject(false);
  public connected$ = this.connected.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  /**
   * to set if user is connected
   * @param userIsConnected
   */
  setConnected(userIsConnected: boolean) {
    this.connected.next(userIsConnected);
  }

  generateFormRegister() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.maxLength(255)]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  generateFormLogin() {
    return this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(25)]],
      password: ['', Validators.required]
    });
  }

  transformUserFormToUser(user: any): User {
   return new User(
      null,
      user.username,
      user.email,
      user.password
    );
  }

  register(user: any): Observable<User> {
    const u = this.transformUserFormToUser(user);
    return this.http.post<User>(`${urlAPI}/authentication/register`, u, httpOptions);
  }

  login(userLogin: any) {
    return this.http.post<User>(`${urlAPI}/authentication/api-token-auth`, userLogin, httpOptions);
  }
}
