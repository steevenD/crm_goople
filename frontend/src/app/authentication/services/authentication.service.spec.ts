import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';

export const authenticationServiceServiceFake = jasmine.createSpyObj('AuthenticationService',
  [
    'setConnected',
    'generateFormRegister',
    'generateFormLogin',
    'transformUserFormToUser',
    'register',
    'login'
  ]);
describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [FormBuilder],
    imports: [HttpClientTestingModule, FormsModule, BrowserModule]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
