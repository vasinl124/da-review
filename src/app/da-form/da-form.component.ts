import { Component, Inject, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-da-form',
  templateUrl: './da-form.component.html',
  styleUrls: ['./da-form.component.css']
})
export class DaFormComponent implements OnInit {

  participantForm : FormGroup;
  storageRef;
  portfolio;

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, fb: FormBuilder) {

    this.participantForm = fb.group({
     fullName: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
     nickName: [null, Validators.required],
     age: [null, Validators.required],
     email: [null, [Validators.required, CustomValidators.email]],
     occupation: [null, Validators.required],
     workplace: [null, Validators.required],
     purpose: [null, Validators.required],
     fileSize: [null, Validators.compose([Validators.required, Validators.minLength(500000), Validators.maxLength(20000000)])],
     portfolioPath: '',
     time: '',
     portfolioFileSize : new FormControl('', [Validators.required, CustomValidators.max(20 * 1024 * 1024)]),
     reCaptcha : new FormControl('', Validators.required)
    })


    // af.auth.login();

    // af.auth.login();
    // this.items = af.database.list('items');
    // this.items.push({name: 'askjfalskfjslkf'});
    // this.items.update('something', {name: 'somethingchanged'});
    // this.items.remove('something');

    this.storageRef = firebaseApp.storage().ref();
    //
    // this.storageRef.child('jjda-somethignelse.jpg').getDownloadURL().then((url) => {
    //     this.image = url
    //     console.log(url);
    //   });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    console.log('onSubmit');
    console.log(value);
    // console.log(this.participant);
    // console.log(this.portfolio);
    //
    // console.log(this.portfolio.name);

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


    // Add validation in html, database, and

    // radom pick monthly ->  within ... 3 months.

    // after submit add thie customer to mailing list...

    // Add thank you page

  }

  fileChangeEvent(fileInput: any){
    this.portfolio = fileInput.target.files[0];
    this.participantForm.controls['portfolioFileSize'].setValue(this.portfolio.size);
  }

  handleCorrectCaptcha(token) {
    this.participantForm.controls['reCaptcha'].setValue(token);
  }
}
