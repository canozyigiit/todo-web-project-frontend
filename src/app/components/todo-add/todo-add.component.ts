import { User } from './../../models/user';
import { LocalStorageService } from './../../services/local-storage.service';
import { UserService } from 'app/services/user.service';
import { TodoService } from './../../services/todo.service';

import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from 'app/services/manager.service';

@Component({
    selector: 'app-todo-add',
    templateUrl: './todo-add.component.html'
})
export class TodoAddComponent implements OnInit {
    closeResult: string;
    todoAddForm: FormGroup;

    constructor(private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private todoService: TodoService,
        private managerService: ManagerService,
        private userService: UserService,
        private localStorageService: LocalStorageService,
        private toastrService: ToastrService) { }

    ngOnInit(): void {
        this.getManagerId()
        this.createTodoAddForm()
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
    getManagerId() {
       
              let userId = this.localStorageService.getItem("userId")
              if (userId ==null) {
                  return
              } else {
                   this.managerService.getUserById(userId).subscribe(data => {
            this.localStorageService.setItem("manager", data.data)

        })
              }
       
        
      
    }
    createTodoAddForm() {
        if(this.isManager()){
        let manager = this.localStorageService.getItem("manager");
      
        this.todoAddForm = this.formBuilder.group({
            description: ["", Validators.required],
            managerId: [manager.managerId, Validators.required]

        })}else{
            return;
        }
    }
    add() {
        console.log(this.todoAddForm.value)
        if (this.todoAddForm.valid) {

            let todoModel = Object.assign({}, this.todoAddForm.value)

            this.todoService.add(todoModel).subscribe(response => {

                this.toastrService.success(response.message, "Başarılı")
                window.location.reload()
            }, responseError => {
                if (responseError.error.ValidationErrors.length > 0) {
                    for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                        this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")

                    }
                }
            })

        } else {
            this.toastrService.error("Formunuz Hatalı", "Hata")
        }
    }

    isManager() {
        if (this.userService.isAdmin() || this.userService.isDirector()) {
            return true;
        }
        else {
            return false;
        }
    }
  
}
