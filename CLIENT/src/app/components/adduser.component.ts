import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../models';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
})
export class AdduserComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {}
  form!: FormGroup;
  sub$!: Subscription;
  valid = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  resetForm(u: Partial<User> = {}) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(u.name || '', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.formBuilder.control(u.email || '', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.sub$ = this.form.statusChanges.subscribe((v) => {
      console.info('FORM >>>>> ', v);
      this.valid.next(v.toLowerCase() == 'valid');
    });
  }

  addUser() {
    const u = this.getValue();
    console.log('Submitting >>>>> ' + u.name);

    this.userSvc
      .addUser(u)
      .then(() => {
        this.back();
      })
      .catch((error) => {
        alert(`This name is already taken.`);
      });
  }

  getValue(): User {
    return this.form.value as User;
  }

  back() {
    this.resetForm();
    this.router.navigate(['/']);
  }
}
