import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from '../services/api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../services/auth/token.service';
import { NotificationService } from '../services/notification.service';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from '../header/header.component';
import { UploadComponent, UploadingFile } from './upload.component';
import { UploadDocumentService } from '../services/api/uploadDocument.service';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/api/authClient.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { of, throwError } from 'rxjs';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let uploadDocumentSrv: UploadDocumentService;

  let fileDrop = new NgxFileDropEntry('file.jpg', {
    name: 'file.jpg',
    isDirectory: false,
    isFile: true
  });
  var file: File = new File([], 'image/jpeg');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent, HeaderComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule, AppRoutingModule, NgxFileDropModule],
      providers: [LoginService,
        TokenService,
        NotificationService,
        Router,
        UploadDocumentService,
        AuthClientService
      ]
    });
    fixture = TestBed.createComponent(UploadComponent);
    uploadDocumentSrv = fixture.debugElement.injector.get(UploadDocumentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set file status as failed when file type is not allowed', () => {

    fileDrop.relativePath = 'clip.mp4';

    //act
    component.dropped([fileDrop]);

    // assert
    expect(component.files[0].status).toBe(-1);
  });

  it('should set file status as completed when upload a file with allowed type', () => {

    var filename = 'image.jpeg';
    component.files = [{
      fileName: filename,
      status: 0,
      error: undefined
    }];
    fileDrop.relativePath = filename;

    spyOn(uploadDocumentSrv, 'upload').and.returnValue(of({
      documentId: '1',
      fileName: filename
    }));

    //act
    component.uploadFile(file);

    // assert
    expect(component.files[0].status).toBe(1);
  });

  it('should set file status as failed when uploading the file faced with a problem', () => {

    var filename = 'music.mp3';
    component.files = [{
      fileName: filename,
      status: 0,
      error: undefined
    }];
    fileDrop.relativePath = filename;

    spyOn(uploadDocumentSrv, 'upload').and.returnValue(throwError({
        itemId: filename,
        status: 400,
        error: { errorMessage: 'error occured' }
    }));

    //act
    component.uploadFile(file);

    // assert
    expect(component.files[0].status).toBe(-1);
  });

  it('should return as invalid file if the file extenstion is not allowed', () => {

    let filenames = [
        'a.Mp3',
        'a.Mp4',
        'a.avi',
        'a.mov',
        'a.Zip',
        'a.rar',
        'a.7z',
    ];

    for (let i = 0; i < filenames.length; i++) {
      fileDrop.relativePath = filenames[i];

      //act
      let result = component.isFileValidate(fileDrop);

      // assert
      expect(result).toBe(false);
    }
    
  });

  it('should return as valid file if the file extenstion is allowed', () => {

    let filenames = [
        'a.Jpeg',
        'a.Jpg',
        'a.Gif',
        'a.Png',
        'a.Pdf',
        'a.Doc',
        'a.Docx',
        'a.Xls',
        'a.Xlsx',
        'a.Txt',
    ];

    for (let i = 0; i < filenames.length; i++) {
      fileDrop.relativePath = filenames[i];

      //act
      let result = component.isFileValidate(fileDrop);

      // assert
      expect(result).toBe(true);
    }  
    
  });

});