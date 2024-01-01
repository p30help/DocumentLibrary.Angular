import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from '../services/api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { TokenService } from '../services/auth/token.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginSrv: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule],
      providers: [LoginService, TokenService]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    loginSrv = fixture.debugElement.injector.get(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout function when click on Logout button', () => {
    
    var spyNotification = spyOn(loginSrv, "logout");

    // act
    component.OnLogout();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

});