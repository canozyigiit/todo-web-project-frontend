import { LocalStorageService } from './../../services/local-storage.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { User } from 'app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  email = localStorage.getItem('email');
  user: User;
  userName: string
  constructor(public location: Location,
    private element: ElementRef,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
    private userService: UserService) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  checkToLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
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
  logOut() {
    localStorage.clear()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  checkToEmail() {
    if (localStorage.getItem('email')) {
      return true;
    } else {
      return false;
    }
  }
  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe(response => {
        this.user = response.data;
      })
    }
  }

  getUser() {
    return localStorage.getItem('user');
  }


}
