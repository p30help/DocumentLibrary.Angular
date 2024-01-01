import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from '../services/api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../services/auth/token.service';
import { DocumentsComponent } from './documents.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { GenerateTemporaryLinkService } from '../services/api/generateTemporaryLink.service';
import { GetListOfDocumentsService } from '../services/api/getListOfDocuments.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AuthClientService } from '../services/api/authClient.service';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';
import { DocumentResponse } from '../services/api/responses/getListOfDocumentsResponse';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let generateTemporaryLinkSrv: GenerateTemporaryLinkService;
  let getListOfDocumentsSrv: GetListOfDocumentsService;
  let ngbModalSrv: NgbModal;
  let notificationSrv: NotificationService;
  let activatedRouteSrv: ActivatedRoute;
  let routerSrv: Router;
  let doc : DocumentResponse = {
    id: '1',
    fileName: 'file.jpeg',
    contentType: 'image/jpeg',
    documentType: 'picture',
    downloadCount : 0,
    recordDate: new Date()
  };


  const fakeActivatedRoute = {
    queryParams: { subscribe: () => { } },
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsComponent, HeaderComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule, NgbModule, AppRoutingModule],
      providers: [LoginService,
        TokenService,
        NotificationService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        Router,
        GenerateTemporaryLinkService,
        GetListOfDocumentsService,
        AuthClientService,
        NgbModal]
    });
    fixture = TestBed.createComponent(DocumentsComponent);
    generateTemporaryLinkSrv = fixture.debugElement.injector.get(GenerateTemporaryLinkService);
    getListOfDocumentsSrv = fixture.debugElement.injector.get(GetListOfDocumentsService);
    ngbModalSrv = fixture.debugElement.injector.get(NgbModal);
    notificationSrv = fixture.debugElement.injector.get(NotificationService);
    activatedRouteSrv = fixture.debugElement.injector.get(ActivatedRoute);
    routerSrv = fixture.debugElement.injector.get(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill documents when call load documents', () => {

    spyOn(getListOfDocumentsSrv, "call").and.returnValue(of({
      data: [doc],
      totalCount: 10,
      currentPageNumber: 1
    }));

    //act
    component.loadDocuments(1);

    // assert
    expect(component.documents.length).toBe(1);
    expect(component.totalCount).toBe(10);
  });

  it('should stop process if currentDocument is null when try GenerateTempLink', () => {

    component.currentDocument = undefined;
    var callSpy = spyOn(generateTemporaryLinkSrv, "call");

    //act
    component.OnGenerateTempLink();

    // assert
    expect(callSpy).toHaveBeenCalledTimes(0);
  });

  it('should show warning if selectedExpirationTime is not defined when try GenerateTempLink', () => {

    component.currentDocument = doc;
    component.selectedExpirationTime = undefined;
    var showWarningSpy = spyOn(notificationSrv, "showWarning");

    //act
    component.OnGenerateTempLink();

    // assert
    expect(showWarningSpy).toHaveBeenCalled();
  });

  it('should call api when selectedExpirationTime and currentDocument is defined when try GenerateTempLink', () => {

    component.currentDocument = doc;
    component.selectedExpirationTime = 1000;
    var callSpy = spyOn(generateTemporaryLinkSrv, "call").and.returnValue(of({
      url: 'http://localhost',
      contentType: 'image/jpeg',
      FileName: 'file.jpeg'
    }));

    //act
    component.OnGenerateTempLink();

    // assert
    expect(callSpy).toHaveBeenCalled();
  });

  it('should open modal when click on GenerateTempLink Button', () => {

    component.currentDocument = undefined;
    var callSpy = spyOn(ngbModalSrv, "open");

    //act
    component.OngenerateTempLinkButtonClicked(doc, undefined);

    // assert
    expect(callSpy).toHaveBeenCalled();
    expect(component.currentDocument).not.toBeNull();
  });

});