import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../graphql/graphql';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserType } from '../../../services/auth.service';

interface Number {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss'],
})
export class PhonebookComponent implements OnInit {
  numbers: Number[];
  numberForUpdateId: number | null = null;
  isEditing = false;
  currentUser: UserType = this.authService.getCurrentUser;
  form: FormGroup;
  editForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.getNumbers();
  }

  getNumbers() {
    this.apollo
      .watchQuery({
        query: Query.getNumberById,
        variables: { ownerId: this.currentUser.id },
      })
      .valueChanges.pipe(map((result: any) => result.data))
      .subscribe((data) => {
        this.numbers = data.phoneNumbersPersonal;
      });
  }

  addNumber(event) {
    event.preventDefault();
    const { name, phone } = this.form.value;
    const ownerId = this.currentUser.id;
    this.apollo
      .mutate({
        mutation: Query.addNumber,
        variables: {
          name,
          phone,
          ownerId,
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.numbers = [...this.numbers, data.addNumber];
          this.form.reset()
        },
        (error) => {
          console.log('Ошибка запроса, error');
        }
      );
  }

  editNumber(i) {
    this.isEditing = true;
    const number = this.numbers[i];
    this.numberForUpdateId = number.id;
    this.editForm = new FormGroup({
      name: new FormControl(number.name, Validators.required),
      phone: new FormControl(number.phone, Validators.required),
    });
  }

  saveNumber(event) {
    event.preventDefault();
    const { name, phone } = this.editForm.value;
    const prevDate = this.numbers.find(
      (item) => item.id === this.numberForUpdateId
    );
    const input: { name?: string; phone?: string } = {};
    if (prevDate.name !== name) {
      input.name = name;
    }
    if (prevDate.phone !== phone) {
      input.phone = phone;
    }
    if (!Object.keys(input).length) {
      this.isEditing = false;
      this.editForm.reset();
    } else {
      this.apollo
        .mutate({
          mutation: Query.updateNumber,
          variables: {
            id: this.numberForUpdateId,
            input,
          },
        })
        .subscribe(
          ({ data }: any) => {
            if (data['updateNumber']) {
              this.numbers = [
                ...this.numbers.map((number) => {
                  if (number.id === this.numberForUpdateId) {
                    number.name = name;
                    number.phone = phone;
                  }
                  return number;
                }),
              ];
              this.numberForUpdateId = null;
              this.isEditing = false;
              this.editForm.reset();
            }
          },
          (error) => {
            console.log('there was an error sending the query', error);
          }
        );
    }
  }

  deleteNumber(index: number) {
    const id = this.numbers[index].id;
    this.apollo
      .mutate({
        mutation: Query.deleteNumber,
        variables: { id },
      })
      .subscribe(
        ({ data }): any => {
          if (data['deleteNumber']) {
            this.numbers = this.numbers.filter((item) => item.id !== id);
          }
        },
        (error) => {
          console.log('Ошибка запроса', error);
        }
      );
  }
}
