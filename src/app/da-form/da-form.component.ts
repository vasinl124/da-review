import { Component, Inject, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';


@Component({
  selector: 'app-da-form',
  templateUrl: './da-form.component.html',
  styleUrls: ['./da-form.component.css']
})
export class DaFormComponent implements OnInit {

  storageRef;
  portfolio;

  participant = {
    fullName: '',
    nickName: '',
    age: '',
    email: '',
    occupation: '',
    workplace: '',
    purpose: '',
    portfolioPath: '',
    time: ''
  };


  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    // af.auth.login();

    // af.auth.login();
    // this.items = af.database.list('items');
    // this.items.push({name: 'askjfalskfjslkf'});
    // this.items.update('something', {name: 'somethingchanged'});
    // this.items.remove('something');

    console.log(this.participant);

    this.storageRef = firebaseApp.storage().ref();
    //
    // this.storageRef.child('jjda-somethignelse.jpg').getDownloadURL().then((url) => {
    //     this.image = url
    //     console.log(url);
    //   });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.participant);
    console.log(this.portfolio);

    console.log(this.portfolio.name);

    // if (this.portfolio) {
    //   console.log(this.portfolio);
    //
    //   this.storageRef.child('images/jjda-somethignelse.jpg')
    //   .put(this.portfolio).then(function(snapshot) {
    //     console.log(snapshot);
    //     console.log('Uploaded a blob or file!');
    //   });;
    // }

    // find existing email first if so update the one with new information...

    // if email is not found then add new item....

    // random file name -> images/xxxxx.png


    // radom pick monthly ->  within ... 3 months.

  }

  fileChangeEvent(fileInput: any){
    this.portfolio = fileInput.target.files[0];
    console.log(this.portfolio);

  }

  handleCorrectCaptcha(event) {
    console.log(event);
  }
}
