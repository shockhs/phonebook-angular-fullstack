import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';

@NgModule({
  declarations: [PhonebookComponent, PhonenumberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PhonebookComponent],
})
export class DashboardModule {}
