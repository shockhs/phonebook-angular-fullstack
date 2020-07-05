import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phonebook';

  constructor(private authService:AuthService, private router:Router) {
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }

  async logout() {
    await this.authService.logout().then(()=>{
      this.router.navigate(['login']);
    })
  }
}
