import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
