import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

export class NetworkDataAccess {
    _profile: string;
    _handler: AxiosInstance;
    _base_url: string;
    private _defaultHeader: any;

    static INSTANCES: { [x: string]: NetworkDataAccess } = {};

    static getProfile(profile_name: string) {
        return this.INSTANCES[profile_name];
    }

    constructor(profile_name: string, base_url: string) {
        this._profile = profile_name;

        // NOTE: I don't understand why they use these code lines => comment for now
        // if (!NetworkDataAccess.INSTANCES[profile_name]) {
        //     NetworkDataAccess.INSTANCES[profile_name] = this;
        // }

        this._base_url = base_url;
        this._defaultHeader = {};
        this._handler = axios.create({
            baseURL: base_url,
            withCredentials: true,
            timeout: 30000,
        });
        NetworkDataAccess.INSTANCES[profile_name] = this;
        return NetworkDataAccess.INSTANCES[profile_name];
    }

    _request(method: Method, { headers, ...args }: AxiosRequestConfig) {
        return this._handler({
            ...args,
            method,
            headers: {
                ...this._defaultHeader,
                ...headers,
            },
        });
    }

    Get(url: string, args?: AxiosRequestConfig) {
        return this._request('get', { ...args, url });
    }

    Post(url: string, args?: AxiosRequestConfig) {
        return this._request('post', { ...args, url });
    }

    Update(url: string, args?: AxiosRequestConfig) {
        return this._request('patch', { ...args, url });
    }

    Replace(url: string, args?: AxiosRequestConfig) {
        return this._request('put', { ...args, url });
    }

    Delete(url: string) {
        return this._request('delete', { url });
    }
}

export const TestProfile = new NetworkDataAccess('data', 'https://jsonplaceholder.typicode.com/');
export const DataProfile = new NetworkDataAccess('data', 'http://127.0.0.1:5000/');