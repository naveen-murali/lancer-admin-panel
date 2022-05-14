import axios from 'axios';
import { BASE_URL } from "./app.util";

export const axiosConfig = axios.create({
    baseURL: BASE_URL
});