import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhonebookComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PhonebookComponent],
})
export class DashboardModule {}
