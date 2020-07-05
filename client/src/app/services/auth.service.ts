import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Subject } from 'rxjs';

export interface UserType {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  get getCurrentUser(): UserType {
    const user = JSON.parse(localStorage.getItem('user'));
    return { id: user.uid, email: user.email };
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.afAuth
      .signOut()
      .then(() => localStorage.removeItem('user'))
      .catch((err) => {
        console.log(err);
      });
  }
}
