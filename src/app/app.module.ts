import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { TabComponent } from './pages/tab/tab.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { ImageModalComponent } from './pages/image-modal/image-modal.component';
import { AngularFireModule } from '@angular/fire'
import * as firebase from 'firebase';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { IonicStorageModule } from '@ionic/storage';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2261774144141733")
  }
]);

export function provideConfig() {
  return config;
}


export const fireBaseConfig = {
  apiKey: "AIzaSyDldhs5JYFQgNxi5CesHRIpDDi9Qc78n68",
  authDomain: "firestore-a9fae.firebaseapp.com",
  databaseURL: "https://firestore-a9fae.firebaseio.com",
  projectId: "firestore-a9fae",
  storageBucket: "firestore-a9fae.appspot.com",
  messagingSenderId: "496484448815",
  appId: "1:496484448815:web:369097d2fd4d8d1e"
}
firebase.initializeApp(fireBaseConfig);
export function tokenGetter() {
  return localStorage.getItem('currentUser');
}


@NgModule({
  declarations: [
    AppComponent,
    ImageModalComponent,
  ],
  entryComponents: [ImageModalComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireModule.initializeApp(fireBaseConfig), 
    AutoCompleteModule,
    SocialLoginModule,
    IonicModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080', 'http://steel-citizen-193608.appspot.com']
      }
    }),
    AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    { provide: AuthServiceConfig, useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
