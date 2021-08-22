import { LocalStorageService } from './../../services/local-storage.service';

import { UserOperationClaimService } from './../../services/user-operation-claim.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import { ManagerService } from 'app/services/manager.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User;
    data: Date = new Date();
    focus;
    focus1;
    loginForm: FormGroup
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private managerService: ManagerService,
        private localStorageService: LocalStorageService,
        private userOperationClaimService: UserOperationClaimService,
        private toastrService: ToastrService) { }

    ngOnInit() {
        this.createLoginForm()

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        })
    }

    login() {
        if (this.loginForm.valid) {
            let loginModel = Object.assign({}, this.loginForm.value)
            this.authService.login(loginModel).subscribe(data => {
                this.router.navigate(["todo"])
                this.toastrService.success("Giriş Yapıldı", "Başarılı")
                localStorage.setItem("token", data.data.token)

                this.getUserByEmail(loginModel.email);
                if (data.success == true) {
                    localStorage.setItem("email", this.loginForm.value.email)
                    this.setClaim(this.loginForm.value.email)
                    this.getManager(this.loginForm.value.email)
                }
            }, responseError => {
                console.log(responseError)
                this.toastrService.error(responseError.error)
            })
        }
    }
    getUserByEmail(email: any) {
        this.userService.getByEmail(email).subscribe(response => {
            this.user = response.data;
            this.localStorageService.setItem("user", this.user.email)
            localStorage.setItem("user", this.user.firstName.toString() + " " + this.user.lastName.toString())
            this.localStorageService.setItem("userId", this.user.id)
        });
    }
    setClaim(email) {
        //TODO:Refactoring
        this.userOperationClaimService.GetByUserClaimEmail(email).subscribe(data => {
          
            if (data.data == null) {
              
               return;
            }
            if (data.data.operationClaimId == 1) {
                localStorage.setItem("claim", "admin")
            }
            if (data.data.operationClaimId == 2) {
                localStorage.setItem("claim", "director")
            }

        });
    }

    getManager(mail) {
        this.managerService.getByMail(mail).subscribe(data => {
            if (data.data == null) {
                return;
            } else {
                  this.localStorageService.setItem("manager", data.data)
            }
          
        })

    }

}
