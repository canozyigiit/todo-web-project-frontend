import { Todo } from 'app/models/todo';
import { Injectable } from '@angular/core';
import { Manager } from 'app/models/manager';

import { User } from '../models/user';
import { Employee } from 'app/models/employee';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  manager: string = 'manager';
  user: string = 'user';
  todo:string = "currentTodo"
  employee:string = "employee"

  constructor() {}

  setItem(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  clean() {
    localStorage.clear();
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem(this.user)!);
  }
  getManager(): Manager {
    return JSON.parse(localStorage.getItem(this.manager)!);
  }
  getTodo(): Todo {
    return JSON.parse(localStorage.getItem(this.todo)!);
  }
  getEmployee(): Employee {
    return JSON.parse(localStorage.getItem(this.employee)!);
  }
 
}