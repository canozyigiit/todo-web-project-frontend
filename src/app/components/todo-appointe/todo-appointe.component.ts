import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'app/models/todo';
import { TodoService } from 'app/services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-appointe',
  templateUrl: './todo-appointe.component.html',
  styleUrls: ['./todo-appointe.component.css']
})
export class TodoAppointeComponent implements OnInit {
  closeResult: string;
  todos: Todo[] = []
  filterText = ""
  constructor(private todoService: TodoService, 
    private toastrService: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAllIsAppointedFalse()
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
  GetAllIsAppointedFalse() {
    this.todoService.GetAllIsAppointedFalse().subscribe(response => {
      this.todos = response.data
      this.toastrService.success("Atanmamış Todolar Listelendi.")
    })
  }
  toDoDelete(todo) {
    this.todoService.delete(todo).subscribe(response => {
      this.toastrService.info(response.message, "Başarılı")
      window.location.reload()
    })

  }
}
