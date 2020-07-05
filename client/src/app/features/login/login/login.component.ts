import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss','./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: null | string = null

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async registerToggle() {
    await this.router.navigate(['register'])
  }

  async submit(event) {
    event.preventDefault();
    const { email, password } = this.form.value;
    await this.authService.login(email,password).then((res)=>{
      if (res.user) this.router.navigate([''])
    }).catch(error=> this.error = error.message)
  }
}
