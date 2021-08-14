export interface TodoDetails {
    ToDoId: number;
    Description?: string;
    EmployeeFirstName?: string
    EmployeeLastName?: string,
    ManagerFirstName?: string,
    ManagerLastName?: string,
    CreatedDate?: Date;
    AppointedDate?: Date;
    IsAppointed?: boolean;
    IsEnded?: boolean;
}