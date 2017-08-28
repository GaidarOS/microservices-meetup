import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InputTextModule, ButtonModule }  from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import {FieldsetModule, DialogModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
		HttpModule,
		FieldsetModule,
    InputTextModule, 
		ButtonModule,
		DialogModule,
		GrowlModule,
		RouterModule.forRoot([
    {
      path: 'login',
      component: LoginComponent
		}
		

])
  ],
  providers: [
    LoginService
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { 

 
}
