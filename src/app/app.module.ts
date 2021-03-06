import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { AlertModule, DropdownModule, CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppComponent } from './app.component';
import { DaFormComponent } from './da-form/da-form.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { AdminComponent } from './admin/admin.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDgFkWRUS9smPFsLPP806XxToup18nzRBM",
  authDomain: "da-review.firebaseapp.com",
  databaseURL: "https://da-review.firebaseio.com",
  storageBucket: "da-review.appspot.com",
  messagingSenderId: "177689108109"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous,
}

@NgModule({
  declarations: [
    AppComponent,
    DaFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    TermsconditionsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AlertModule,
    DropdownModule,
    ModalModule,
    CollapseModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    ReCaptchaModule,
    RouterModule.forRoot([
     {
       path: 'apply',
       component: DaFormComponent
     },
     {
       path: '',
       component: HomeComponent
     },
     {
       path: 'termsconditions',
       component: TermsconditionsComponent
     },
     {
       path: 'admin',
       component: AdminComponent
     },
     {
       path: '**',
       component: PageNotFoundComponent
     }
   ]),
   Angulartics2Module.forRoot()
  ],
  providers: [
    Angulartics2GoogleAnalytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
