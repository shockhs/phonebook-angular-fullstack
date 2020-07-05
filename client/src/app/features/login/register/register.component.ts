import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: null | string = null;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        verifyPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: this.checkPasswords.bind(this),
      }
    );
  }

  checkPasswords(formGroup: FormGroup) {
    let pass = formGroup.get('password').value;
    let confirmPass = formGroup.get('verifyPassword').value;
    return pass === confirmPass ? null : { confirmedValidator: true };
  }

  async loginToggle() {
    await this.router.navigate(['login'])
  }

  async submit(event) {
    event.preventDefault();
    const { email, password } = this.form.value;
    await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('Registered user: ', user);
        this.router.navigate(['']);
      })
      .catch((error) => (this.error = error.message));
  }
}
