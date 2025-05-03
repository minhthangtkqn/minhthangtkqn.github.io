import axios from "axios";

export const CentralRequestor = axios.create({
    timeout: 30000,
    // withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export * from './hook';
