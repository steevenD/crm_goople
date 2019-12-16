import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MockComponent} from 'ng-mocks';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {InfoComponent} from './shared/components/info/info.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MockComponent(NavbarComponent),
        MockComponent(InfoComponent)
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        FormsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  });
});
