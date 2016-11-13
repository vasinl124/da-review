import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component, ViewContainerRef } from '@angular/core';
import { MetaService } from 'ng2-meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, private metaService: MetaService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }

  public isCollapsed:boolean = true;

}
