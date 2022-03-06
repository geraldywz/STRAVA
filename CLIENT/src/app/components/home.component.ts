import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  userList: User[] = [];

  constructor(private userSvc: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSvc
      .getUsers()
      .then((ul) => (this.userList = ul))
      .catch((error) => {
        console.log(error);
      });
  }

  reload() {
    this.router.navigate(['/']);
  }
}
