import { Component, Inject, OnInit, ViewChild, NgZone } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
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
  jsonp;
  isRegistered = false;
  submitting = false;

  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any, fb: FormBuilder, private http: Http, jsonp: Jsonp, private _ngZone: NgZone) {
    this.jsonp = jsonp;

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

  stringGen(len){
      var text = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < len; i++ )
          text += charset.charAt(Math.floor(Math.random() * charset.length));
      return text;
  }


  onSubmit(value: any) {
    this.submitting = true;
    value.time = Date.now();
    value.portfolioPath = `user_uploads/${this.stringGen(6)}${this.portfolio.name}`
    delete value.reCaptcha;
    delete value.portfolioFileSize;

    this.af.auth.login();

    if (this.portfolio) {
      this.showChildModal();
      var uploadTask = this.storageRef.child(value.portfolioPath)
      .put(this.portfolio)
      .then((snapshot) => {
        // add data/ref to database;
        let queryObservable = this.af.database.list('users', {
          query: {
           orderByChild: 'email',
           equalTo: value.email
          }
        });

        queryObservable.subscribe(queriedItems => {
          if (queriedItems.length > 0) {
            this.af.database.object(`users/${queriedItems[0].$key}`).update(value);
          } else {
            this.users = this.af.database.list('users');
            this.users.push(value);
          }
        }).unsubscribe();

        // adding email to mailing list
        let mailchimpUrl = `
        https://dreamaction.us14.list-manage.com/subscribe/post-json?u=a762fb13b6b4e5406f85f0d79&id=2680e8e29b&subscribe=Subscribe&EMAIL=${value.email}&c=JSONP_CALLBACK`;
        this.jsonp.request(mailchimpUrl, { method: 'Get' })
         .subscribe((res) => {
           this.hideChildModal();
           this._ngZone.run(() => {
               this.isRegistered = true;
               console.log('Updated List: ', this.isRegistered);
           });
          //  console.log(res.json() );
         });
      });
    }
    // radom pick monthly ->  within ... 3 months.
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
