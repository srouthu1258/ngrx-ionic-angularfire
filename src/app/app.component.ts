import './rxjs-operators';

import { Component, ViewChild } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Nav, Platform } from 'ionic-angular';

import * as LoginActions from '../actions/login.action';
import { GizmoListPage } from '../gizmo/pages/gizmo-list/gizmo-list.page';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/login/login.page';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RealtimeDatabasePage } from '../pages/realtime-database/realtime-database.page';
import { SignupPage } from '../pages/signup/signup.page';
import * as FromRoot from '../reducers';
import { WidgetListPage } from '../widget/pages/widget-list/widget-list.page';

// Should be import * as LoginActions from '../actions/login.action';
// See: https://gitter.im/ngrx/effects?at=57f3a2cbd45d7f0f52601422
//
// Do not import from 'firebase' as you'd lose the tree shaking benefits
// Add the RxJS Observable operators we need in this app.
export interface PageInterface {
  title: string;
  component: any;
  // icon: string;
  // logsOut?: boolean;
  // index?: number;
  // tabComponent?: any;
}

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  // rootPageAA: any = Page1;
  public rootPage: any;
  public pages: PageInterface[];

  public loginState$: any;
  // private subscription;

  constructor(
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public statusBar: StatusBar,
    private store: Store<FromRoot.State>,
  ) {
    //
    console.log('MyApp:constructor');
    this.initializeApp();

    this.loginState$ = this.store.select(FromRoot.getLoginState);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Page Home', component: HomePage },
      { title: 'Gizmos(Cloud Firestore)', component: GizmoListPage },
      { title: 'Widgets(Cloud Firestore)', component: WidgetListPage },
      { title: 'Realtime Database', component: RealtimeDatabasePage },
      { title: 'Page Login', component: LoginPage },
      { title: 'Page Signup', component: SignupPage },
      { title: 'Logout', component: Page1 },
    ];
    // Subscribe to the auth object to check for the login status
    // of the user.
    afAuth.authState.take(1).subscribe((authState: firebase.User) => {
      // Run once.
      // af.auth.unsubscribe();

      console.log('af.auth.subscribe:authState>', authState);
      const authenticated: boolean = !!authState;

      console.log('authenticated:', authenticated);
      // this.rootPage = HomePage;
      if (authenticated) {
        this.rootPage = HomePage;

        this.store.dispatch(
          new LoginActions.RestoreAuthentication({
            displayName: authState.displayName,
            email: authState.email,
            isAnonymous: authState.isAnonymous,
          }),
        );
      } else {
        this.rootPage = Page1;
      }
    });
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform.ready');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });

    /*
        this.subscription =
          this.store
            .let(FromRoot.getLoginState)
            .subscribe(loginState => {
              // Triggered when loginState changes.
              // i.e. when user logs in or logs out.
              console.log('loginState>', loginState);
              console.log('loginState.isAuthorized>', loginState.isAuthenticated);
              // this.enableMenu(loginState.isAuthenticated);

              /*
                        if (loginState.isAuthorized) {
                          this.rootPage = HomePage;
                        }
                        else {
                          this.rootPage = LoginPage;
                        }
              * /
            });
    */
  }

  public openPage(page: PageInterface) {
    console.log('openPage');

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        // this.userData.logout();
        this.store.dispatch(new LoginActions.Logout());
        this.afAuth.auth.signOut();
      }, 1000);
    }
  }
}
