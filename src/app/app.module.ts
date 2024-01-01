import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/api/login.service';
import { TokenService } from './services/auth/token.service';
import { DownloadDocumentService } from './services/api/downloadDocument.service';
import { GenerateTemporaryLinkService } from './services/api/generateTemporaryLink.service';
import { GetCurrentUserInfoService } from './services/api/getCurrentUserInfo.service';
import { GetListOfDocumentsService } from './services/api/getListOfDocuments.service';
import { RegisterService } from './services/api/register.service';
import { UploadDocumentService } from './services/api/uploadDocument.service';
import { FormsModule } from '@angular/forms';
import { DocumentItemComponent } from './document-item/documentItem.component';
import { IconComponent } from './icons/Icon.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './services/notification.service';
import { AuthClientService } from './services/api/authClient.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DocumentsComponent,    
    UploadComponent,
    DocumentItemComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoginService, 
    TokenService, 
    DownloadDocumentService,
    GenerateTemporaryLinkService,
    GetCurrentUserInfoService,
    GetListOfDocumentsService,
    RegisterService,
    UploadDocumentService,
    NotificationService,
    AuthClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
