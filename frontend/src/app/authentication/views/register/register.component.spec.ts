import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {MockComponent} from 'ng-mocks';
import {InputComponent} from '../../../shared/components/input/input.component';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InfoService} from '../../../shared/services/info.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, MockComponent(InputComponent) ],
      providers: [FormBuilder, HttpClient, AuthenticationService, InfoService],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click display alert', () => {
    component.displayAlertRegister();
    expect(component.displayAlert).toBeTruthy();
  });
});
