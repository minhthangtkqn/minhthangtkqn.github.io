import axios from "axios";

export const CentralRequestor = axios.create({
    timeout: 30000,
    // withCredentials: true,
});

export * from './api';