import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NotificationService } from '../services/notification.service';
import { LoginService } from '../services/api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let notificaitonSrv: NotificationService;
  let loginSrv: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule],
      providers: [NotificationService, LoginService, ToastrService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    notificaitonSrv = fixture.debugElement.injector.get(NotificationService);
    loginSrv = fixture.debugElement.injector.get(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when email is empty', () => {
    component.inputEmail = '';
    component.inputPass = '11';
    var spyNotification = spyOn(notificaitonSrv, "showWarning");

    // act
    component.OnLogin();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error when password is empty', () => {
    component.inputEmail = '11';
    component.inputPass = '';
    var spyNotification = spyOn(notificaitonSrv, "showWarning");

    // act
    component.OnLogin();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should call api when email and password are filled', () => {
    component.inputEmail = '11';
    component.inputPass = '11';
    var spyNotification = spyOn(notificaitonSrv, "showWarning");

    // act
    component.OnLogin();

    // assert
    expect(spyNotification).toHaveBeenCalledTimes(0);
  });

  it('should call success notification when email and password are filled and api success', () => {
    component.inputEmail = '11';
    component.inputPass = '11';

    spyOn(loginSrv, "login").and.returnValue(of({
      accessToken: 'token'
    }));
    var spyNotification = spyOn(notificaitonSrv, "showSuccess");

    // act
    component.OnLogin();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should call api but show error when api failed', () => {
    component.inputEmail = '11';
    component.inputPass = '11';

    spyOn(loginSrv, "login").and.returnValue(throwError(() => { status: 400 }));
    var spyNotification = spyOn(notificaitonSrv, "showApiError");

    // act
    component.OnLogin();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

});