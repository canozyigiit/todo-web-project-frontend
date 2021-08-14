import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoFilterPipe } from './pipes/todo-filter.pipe';
import { TodoComponent } from './components/todo/todo.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoAppointeComponent } from './components/todo-appointe/todo-appointe.component';
import { TodoAppointeModalComponent } from './components/todo-appointe/todo-appointe-modal/todo-appointe-modal.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TodoFilterPipe,
        TodoComponent,
        LoginComponent,
        TodoAddComponent,
        TodoAppointeComponent,
        TodoAppointeModalComponent,
        TodoUpdateComponent,
        
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        NouisliderModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,

        JwBootstrapSwitchNg2Module,
        HttpClientModule,
        Ng2SearchPipeModule,
        ToastrModule.forRoot({
            positionClass: "toast-bottom-right",
            timeOut: 2000
        })


    ],
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
