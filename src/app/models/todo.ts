export interface Todo {
    ToDoId?: number;
    Description?: string;
    EmployeeId?: number
    ManagerId?: number
    EmployeeFirstName?: string
    EmployeeLastName?: string,
    ManagerFirstName?: string,
    ManagerLastName?: string,
    CreatedDate?: Date;
    AppointedDate?: Date;
    IsAppointed?: boolean;
    IsEnded?: boolean;
}