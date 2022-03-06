import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../config/constants';
import { User } from '../models';

@Injectable()
export class UserService {
  constructor(private constants: Constants, private http: HttpClient) {}

  async getUsers(): Promise<User[]> {
    const userList = lastValueFrom(
      this.http.get<User[]>(this.constants.API_USER_ENDPOINT)
    );
    return userList;
  }

  async addUser(user: Partial<User>) {
    return await lastValueFrom(
      this.http.post<any>(this.constants.API_USER_ENDPOINT, user)
    );
  }
}
