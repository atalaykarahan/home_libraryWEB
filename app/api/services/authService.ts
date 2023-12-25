import { LoginDto } from "@/app/models/DTOs/loginDto"
import axios from "../axios"
import { CONFIG } from "@/config";

export const login = (user: LoginDto) =>{
    return axios.post(`Users/Login`, user)
}