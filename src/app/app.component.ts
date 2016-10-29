import { Component, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!as';

  items: FirebaseListObservable<any[]>;

  image: string;
  storageRef;
  constructor(af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.items = af.database.list('items');
    // this.items.push({name: 'something4'});
    // this.items.update('something', {name: 'somethingchanged'});
    // this.items.remove('something');


    this.storageRef = firebaseApp.storage().ref();

    this.storageRef.child('jjda-somethignelse.jpg').getDownloadURL().then((url) => {
        this.image = url
        console.log(url);
      });
  }

  submit(@Inject(FirebaseApp) firebaseApp: any):void{
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    if (file) {
      console.log(file);

      this.storageRef.child('images/jjda-somethignelse.jpg')
      .put(file).then(function(snapshot) {
        console.log(snapshot);
        console.log('Uploaded a blob or file!');
      });;
    }
    console.log('submit');
  }
}
