import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, router: Router) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          // you can use DomAdapter
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(element); }
        }
      }
      document.body.scrollTop = 0;
    });

  }

  public isCollapsed:boolean = true;

}
