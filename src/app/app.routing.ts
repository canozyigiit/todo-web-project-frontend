import { LoginGuard } from './guards/login.guard';

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoAppointeComponent } from './components/todo-appointe/todo-appointe.component';

const routes: Routes =[
    { path: '', component:LoginComponent, pathMatch: 'full' },
    { path: 'login',       component: LoginComponent },
    { path: 'todo',     component: TodoComponent,canActivate:[LoginGuard] },
    { path: 'todoappointe',     component: TodoAppointeComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
