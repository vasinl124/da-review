import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';


@Component({
  selector: 'app-da-form',
  templateUrl: './da-form.component.html',
  styleUrls: ['./da-form.component.css']
})
export class DaFormComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;

  users;
  participantForm : FormGroup;
  storageRef;
  portfolio;
  af;
  progress = 0;

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, fb: FormBuilder) {

    this.participantForm = fb.group({
     fullName: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
     nickName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
     age: [null, Validators.required],
     email: [null, [Validators.required, CustomValidators.email]],
     occupation: [null, Validators.required],
     workplace: [null, Validators.required],
     purpose: [null, Validators.required],
     portfolioFileSize : new FormControl('', [Validators.required, CustomValidators.max(20 * 1024 * 1024)]),
     reCaptcha : new FormControl('', Validators.required)
    })

    this.af = af;
    this.storageRef = firebaseApp.storage().ref();
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    // value.time = Date.now();
    value.portfolioPath = `user_uploads/${this.portfolio.name}`
    // delete value.reCaptcha;
    // delete value.portfolioFileSize;
    // console.log(value);





    //
    // this.af.auth.login();
    //
    // this.items.update('something', {name: 'somethingchanged'});
    // this.items.remove('something');
    //

    // this.users = this.af.database.list('users');
    // this.users.push(value);

    if (this.portfolio) {
      this.showChildModal();
      var uploadTask = this.storageRef.child(value.portfolioPath)
      .put(this.portfolio)
      .then((snapshot) => {
        this.hideChildModal();
      });
    }

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
    if(this.portfolio) {
      this.participantForm.controls['portfolioFileSize'].setValue(this.portfolio.size);

    }
    this.participantForm.controls['portfolioFileSize'].markAsTouched();
  }

  handleCorrectCaptcha(token) {
    this.participantForm.controls['reCaptcha'].setValue(token);
  }

  handleExpired(e) {
    console.log('expired! ', e );
    this.participantForm.controls['reCaptcha'].setValue('');
  }

  isUploading() {

  }

  showChildModal() {
    this.childModal.show();
  }

  hideChildModal() {
    this.childModal.hide();
  }
}
