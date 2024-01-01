import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from '../services/api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { GetListOfDocumentsService } from '../services/api/getListOfDocuments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AuthClientService } from '../services/api/authClient.service';
import { DocumentItemComponent } from './documentItem.component';
import { DownloadDocumentService } from '../services/api/downloadDocument.service';
import { IconComponent } from '../icons/Icon.component';
import { TokenService } from '../services/auth/token.service';
import { of, throwError } from 'rxjs';
import { DocumentResponse } from '../services/api/responses/getListOfDocumentsResponse';

describe('DocumentItemComponent', () => {
  let component: DocumentItemComponent;
  let fixture: ComponentFixture<DocumentItemComponent>;
  let notificationSrv: NotificationService;
  let downloadDocumentSrv: DownloadDocumentService;
  let document: DocumentResponse = {
    id: '0',
    contentType : '',
    documentType : '',
    downloadCount : 0,
    fileName : '',
    recordDate : new Date(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentItemComponent, IconComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule, AppRoutingModule],
      providers: [LoginService,
        NotificationService,
        GetListOfDocumentsService,
        DownloadDocumentService,
        DocumentItemComponent,
        AuthClientService,
        TokenService,
        NgbModal]
    });
    fixture = TestBed.createComponent(DocumentItemComponent);
    notificationSrv = fixture.debugElement.injector.get(NotificationService);
    downloadDocumentSrv = fixture.debugElement.injector.get(DownloadDocumentService);
    

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DownloadDocument api when click on Download button', () => {

    component.document = document;
    var spyNotification = spyOn(downloadDocumentSrv, "call").and.returnValue(of(null));

    //act
    component.OnDownload();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

  it('should show error notification when downloading api face with problem', () => {

    component.document = document;
    var spyNotification = spyOn(notificationSrv, "showApiError");
    spyOn(downloadDocumentSrv, 'call').and.returnValue(throwError({
      status: 400
    }));

    //act
    component.OnDownload();

    // assert
    expect(spyNotification).toHaveBeenCalled();
  });

});