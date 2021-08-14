import { UserService } from 'app/services/user.service';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'app/models/todo';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  
  todos: Todo[] = []
  filterText = ""

  constructor(private TodoService: TodoService, 
    private toastrService: ToastrService,
     private userService:UserService) { }

  ngOnInit(): void {
    this.GetTodos();
  }

  GetTodos() {
    this.TodoService.getAll().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Bütün Todolar Listelendi.")
    })
  }
  GetAllIsAppointedFalse() {
    this.TodoService.GetAllIsAppointedFalse().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Atanmamış Todolar Listelendi.")
    })
  }
  GetAllIsAppointedTrue() {
    this.TodoService.GetAllIsAppointedTrue().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Atanmış Todolar Listelendi.")
    })
  }
  GetAllIsEndedFalse() {
    this.TodoService.GetAllIsEndedFalse().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Tamamlanmamış Todolar Listelendi.")
    })
  }
  GetAllIsEndedTrue() {
    this.TodoService.GetAllIsEndedTrue().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Tamamlanmış Todolar Listelendi.")
    })
  }
  toDoDelete(todo) {
    this.TodoService.delete(todo).subscribe(response => {
      this.toastrService.info(response.message, "Başarılı")
      window.location.reload()
    })

  }
  isManager() {
    if (this.userService.isAdmin()|| this.userService.isDirector() ) {
      return true;
    }
    else {
      return false;
    }
  }



}
