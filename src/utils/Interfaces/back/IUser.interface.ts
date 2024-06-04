
export enum UserRoles {
    ADMIN = 'admin',
    PATIENT = 'paciente',
    THERAPIST = 'terapeuta'
}

    export interface IUser{
        _id?: string;
        role?: string;
        name?: string;
        email?: string;
        age?: number;
        phone?: string;
        password?: string;
    }