import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<User[]>(this.baseURL + "/all");
  }

  addUser(user: User) {
    return this.httpClient.post(this.baseURL + "/add", user);
  }

  updateUser(id: string, user: User) {
    return this.httpClient.put(this.baseURL + "/update/"+id, user);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(this.baseURL + "/delete/"+ id);
  }
}
