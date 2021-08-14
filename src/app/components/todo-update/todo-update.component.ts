import { LocalStorageService } from './../../services/local-storage.service';
import { Todo } from 'app/models/todo';
import { TodoService } from 'app/services/todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  @Input() toDoId: number;
  closeResult: string;
  todoUpdateForm: FormGroup;
   todo = this.localStorageService.getItem("currentTodo");
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private localStorageService:LocalStorageService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
     this.GetById()
    this.createTodoUpdateForm()
    



  }
  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  GetById() {
    this.todoService.GetById(this.toDoId).subscribe(data => {
      this.localStorageService.setItem("currentTodo",data.data)
    })
  }
  createTodoUpdateForm() {
  
 
    this.todoUpdateForm = this.formBuilder.group({
      ToDoId: [this.todo.toDoId, Validators.required],
      Description: ["", Validators.required],
      EmployeeId: ["", Validators.required],
      ManagerId: [this.todo.managerId, Validators.required],
      CreatedDate: [this.todo.createdDate, Validators.required],
      AppointedDate: [this.todo.appointedDate, Validators.required],
      IsAppointed: [this.todo.isAppointed, Validators.required],
      IsEnded: [this.todo.isEnded, Validators.required]
    })
  }


  Update() {
    console.log(this.todoUpdateForm.value)
    if (this.todoUpdateForm.valid) {
      let todoModel = Object.assign({}, this.todoUpdateForm.value)
      this.todoService.update(todoModel).subscribe(response => {
        console.log(response)
        this.toastrService.success(response.message, "Başarılı")
        window.location.reload()
      }, HttpErrorResponse => {
        console.log(HttpErrorResponse)
        this.toastrService.error(HttpErrorResponse.error.message, "Hata")
      })

    } else {
      this.toastrService.error("Formunuz Hatalı", "Hata")
    }
  }

}
