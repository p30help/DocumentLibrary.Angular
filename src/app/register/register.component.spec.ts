import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationService } from '../services/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../services/api/register.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let notificationSrv: NotificationService;
  let registerSrv: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ HttpClientModule, ToastrModule.forRoot(), FormsModule ],
      providers: [ NotificationService, RegisterService, Router, ToastrService ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    router = fixture.debugElement.injector.get(Router);
    notificationSrv = fixture.debugElement.injector.get(NotificationService);
    registerSrv = fixture.debugElement.injector.get(RegisterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when email is empty', () => {
    component.inputEmail = '';
    component.inputPass = '12345678';
    component.inputPassRepeat = '12345678';

    var spyNotification = spyOn(notificationSrv, "showWarning");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error when email is incorrect', () => {
    component.inputEmail = 'aaa';
    component.inputPass = '12345678';
    component.inputPassRepeat = '12345678';

    var spyNotification = spyOn(notificationSrv, "showWarning");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error when password is empty', () => {
    component.inputEmail = 'a@b.c';
    component.inputPass = '';
    component.inputPassRepeat = '12345678';

    var spyNotification = spyOn(notificationSrv, "showWarning");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error when password and repeated password are not the same', () => {
    component.inputEmail = 'a@b.c';
    component.inputPass = '12345679';
    component.inputPassRepeat = '12345678';

    var spyNotification = spyOn(notificationSrv, "showWarning");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error when password length is lessthan 8 characters', () => {
    component.inputEmail = 'a@b.c';
    component.inputPass = '1234567';
    component.inputPassRepeat = '1234567';

    var spyNotification = spyOn(notificationSrv, "showWarning");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should call success notification when email and password are filled and api success', () => {
    component.inputEmail = 'a@b.c';
    component.inputPass = '12345678';
    component.inputPassRepeat = '12345678';

    //let routerSrv = fixture.debugElement.injector.get(Router);
    var navigateSpy = spyOn(router,"navigate");

    spyOn(registerSrv, "call").and.returnValue(of({
      userId: '000000'
    }));
 
    var spyNotification = spyOn(notificationSrv, "showSuccess");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/Login']);


  });

  it('should call api but show error when api failed', () => {
    component.inputEmail = 'a@b.c';
    component.inputPass = '12345678';
    component.inputPassRepeat = '12345678';
    
    let routerSrv = fixture.debugElement.injector.get(Router);
    spyOn(routerSrv,"navigate").and.stub();

    spyOn(registerSrv, "call").and.returnValue(throwError(() => { status: 400 }));

    var spyNotification = spyOn(notificationSrv, "showApiError");

    // act
    component.OnRegister();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });  

});
