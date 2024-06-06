import { IUser } from "../utils/Interfaces/back/IUser.interface";
import axiosConfig from "../utils/config/axios.config";


/**
 * Funcion para inciar sesion
 * @param {string} email email del usuario
 * @param {string} password contrasena del usuario
 * @returns peticion POST a la API
 */
export const login = (email:string, password:string) => {

    // Declaramos el body para incluirlo en el POST
    const body = {
        email: email,
        password: password,
    }

    // Enviamos la peticion POST al endpoint de login
    return axiosConfig.post('auth/login', body)
}

/**
 * Funcion para registrar un nuevo usuario
 * @param {string} name Nombre del usuario
 * @param {string} email Email del usuario
 * @param {string} password Contrasena del usuario
 * @param {number} age Edad del usuario
 * @param {string} phone Edad del usuario
 * @returns peticion POST a la API
 */
export const register = (name:string, email:string, role:string, password:string, age:number, phone: string) => {

    // Declaramos el body para incluirlo en el POST
    const body:IUser = {
        role: role,
        name: name,
        email: email,
        password: password,
        age: age,
        phone: phone
    }
    console.log(body)
    // Enviamos la peticion POST al endpoint de login
    return axiosConfig.post('auth/register', body)
}