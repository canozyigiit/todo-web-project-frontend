import { ManagementService } from './../../../services/management.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todo-appointe-modal',
  templateUrl: './todo-appointe-modal.component.html',
  styleUrls: ['./todo-appointe-modal.component.css']
})
export class TodoAppointeModalComponent implements OnInit {
  @Input() toDoId: number;
  closeResult: string;
  todoAppointeForm: FormGroup;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private managementService:ManagementService) { }

  ngOnInit(): void {
  this.createTodoAppointeForm()
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
  createTodoAppointeForm() {
    this.todoAppointeForm = this.formBuilder.group({
      employeeId: ["", Validators.required]
    })
  }

  Appointe() {
    console.log(this.todoAppointeForm.value)
    if (this.todoAppointeForm.valid) {
        let todoModel = Object.assign({}, this.todoAppointeForm.value)
        this.managementService.todoAppointe(this.toDoId,todoModel.employeeId).subscribe(response => {
            console.log(response)
            this.toastrService.success(response.message, "Başarılı")
            window.location.reload()
        }, HttpErrorResponse  => {
          console.log(HttpErrorResponse)
          this.toastrService.error(HttpErrorResponse.error.message, "Hata")
        })

    } else {
        this.toastrService.error("Formunuz Hatalı", "Hata")
    }
}

}
