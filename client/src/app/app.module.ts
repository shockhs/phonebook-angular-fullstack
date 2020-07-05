import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AngularFireModule} from "@angular/fire";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import {AngularFireAuthModule} from "@angular/fire/auth";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from "./features/dashboard/dashboard.module";
import {LoginModule} from "./features/login/login.module";
import {environment} from "../environments/environment";
import { InMemoryCache } from "apollo-cache-inmemory";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    DashboardModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://localhost:4000/graphql"
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})

export class AppModule {}
