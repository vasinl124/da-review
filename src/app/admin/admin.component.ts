import { Component, Inject, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user;
  af;
  auth;
  storageRef;
  username;
  password;
  users;
  loggedin = false;
  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.af = af;
  }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth(){
    this.af.auth.subscribe(user => {
      if(user && user.anonymous !== true) {
        // user logged in
        this.user = user;
        this.loggedin = true;

        this.users = this.af.database.list('/users');
      }
      else {
        // user not logged in
        this.user = {};
        this.loggedin = false;
      }
    });
  }
  login(username, password) {
    this.af.auth.login({
      email: username,
      password: password,
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
