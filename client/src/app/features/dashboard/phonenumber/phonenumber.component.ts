import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Number } from '../phonebook/phonebook.component';
import { EventEmitter } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonenumberComponent implements OnInit,DoCheck {
  @Input() number: Number;
  @Input() indexNumber: number;
  @Output() editNumber = new EventEmitter<number>();
  @Output() deleteNumber = new EventEmitter<number>();

  constructor(private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Render', this.number)
  }

  ngDoCheck() {
    this.cd.markForCheck()
  }

  onChange() {
    this.editNumber.emit(this.indexNumber)
  }

  onDelete() {
    this.deleteNumber.emit(this.indexNumber)
  }
}
