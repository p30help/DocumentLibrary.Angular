import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { DocumentsComponent } from './documents/documents.component';
import { CanActivate } from './services/auth/auth.guard';

const routes : Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full' },
  {path: 'Login', component: LoginComponent },
  {path: 'Register', component: RegisterComponent },
  {path: 'Dashboard/Documents', component: DocumentsComponent, canActivate: [CanActivate] },
  {path: 'Dashboard/Upload', component: UploadComponent, canActivate: [CanActivate] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
